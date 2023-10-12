import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import clientValidation from '../clientValidation.js'

function Login(){

    const [loginData, setLoginData] = createSignal({username:"",password:""})
    const [error, setError] = createSignal(null)
    
    const dynamicURL = window.location.hostname=='localhost' ? 'localhost:4000' : 'scrumbucket15.vercel.app'
    
    async function submitForm(e){
        e.preventDefault()
        try{    //validate input on frontend. (If the data is bad, we can catch it before it goes to the server)
            clientValidation.checkUsername(loginData().username)
            clientValidation.checkPassword(loginData().password)
        }
        catch(e){
            setError(e)
            return
        }  
        let res = await fetch(`http://${dynamicURL}/api/users/login`,
        {
            method:"POST",
            body:JSON.stringify(loginData()),
            headers: {"Content-Type": "application/json"}
        })
        res = await res.json();
        if(res.error){
            setError(res.error)
        }
        else{       //clears out setError so that it does not persist on future attempts
            setError(null)
            document.getElementById('login-form').reset()
        }
    }

    function handleChange(e){
        setLoginData({...loginData(),[e.target.id]:e.target.value})
    }

    return (
        <div>
            <p>Log in</p>
            <Show when={error()!=null}>
                <p class={styles.error}>{error()}</p>
            </Show>
            <form onSubmit={submitForm} id="login-form">
                <label for="username">Username: </label>
                <input id="username" onChange={handleChange}>Username</input> <br />
                <label for="password">Password: </label>
                <input id="password" onChange={handleChange} type="password">Password</input> <br />
                <br />
                <button class={styles.button} type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login