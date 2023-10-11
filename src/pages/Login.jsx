import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';

function Login(){

    const [loginData, setLoginData] = createSignal({username:"",password:""})

    async function submitForm(e){
        e.preventDefault()
        
        let res = await fetch(`https://cs555-backend.vercel.app/api/users/login`,
        {
            method:"POST",
            body:JSON.stringify(loginData()),
            headers: {"Content-Type": "application/json"}
        })
        res = await res.json();
        if(res.error){
            alert(res.error)
        }
    }

    function handleChange(e){
        setLoginData({...loginData(),[e.target.id]:e.target.value})
    }

    return (
        <div>
            <p>Log in</p>
            <form onSubmit={submitForm}>
                <label for="username">Username: </label>
                <input id="username" onChange={handleChange}>Username</input> <br />
                <label for="password">Password: </label>
                <input id="password" onChange={handleChange} type="password">Password</input> <br />
                <br />
                <button class={styles.link} type="submit">Log in</button>
            </form>
        </div>
    )
}

export default Login