import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import clientValidation from '../clientValidation.js'

function Login(props){
    const [loginData, setLoginData] = createSignal({username:"",password:""})
    const [loggingIn, setLoggingIn] = createSignal(false)     //used for hiding the login button until the user is successfully logged in
    const [error, setError] = createSignal(null)

    const navigate=useNavigate()
        
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
        let res = await fetch(`${props.url}/api/users/login`,
        {
            method:"POST",
            credentials:'include',
            body:JSON.stringify(loginData()),
            headers: {"Content-Type": "application/json"}
        })
        res = await res.json();
        if(res.error){
            setError(res.error)
        }
        else{       //clears out setError so that it does not persist on future attempts
            setError(null)
            navigate('/home')
            document.getElementById('login-form').reset()
        }
        setLoggingIn(false)
    }

    function handleChange(e){
        setLoginData({...loginData(),[e.target.id]:e.target.value})
    }

    return (
        <div class={styles.backgroundImage}>
            <h2>Log In</h2>
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
                    <button class={styles.button} type="submit">Log In</button>
                </Show>
            </form>
        </div>
    )
}

export default Login