import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import clientValidation from '../clientValidation.js'

function Login(){

    const [loginData, setLoginData] = createSignal({username:"",password:""})
    const [loggingIn, setLoggingIn] = createSignal(false)     //used for hiding the login button until the user is successfully logged in
    const [error, setError] = createSignal(null)
    
    const dynamicURL = window.location.hostname=='localhost' ? ['','localhost:4000'] : ['s','cs555-backend.vercel.app'] //adding https
    
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
        setLoggingIn(true)
        let res = await fetch(`http${dynamicURL[0]}://${dynamicURL[1]}/api/users/login`,
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
            alert("login placeholder")
            document.getElementById('login-form').reset()
        }
        setLoggingIn(false)
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
                <Show when={loggingIn()==false}>
                    <button class={styles.button} type="submit">Log in</button>
                </Show>
            </form>
        </div>
    )
}

export default Login