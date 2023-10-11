import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';

function Signup(){

    const [signupData, setSignupData] = createSignal({username:"",password:"",displayName:""})
    const [error, setError] = createSignal(null)

    async function submitForm(e){
        e.preventDefault()
        console.log(signupData())
        let res = await fetch(`https://cs555-backend.vercel.app/api/users/signup`,
        {
            method:"POST",
            body:JSON.stringify(signupData()),
            headers: {"Content-Type": "application/json"}
        })
        res = await res.json();
        if(res.error){
            setError(res.error)
        }
        else{
            setError(null)
        }
    }

    function handleChange(e){
        setSignupData({...signupData(),[e.target.id]:e.target.value})
    }

    return (
        <div>
            <p>Sign up</p>
            <Show when={error()!=null}>
                <p class={styles.error}>{error()}</p>
            </Show>
            <p class="show-error"></p>
            <form onSubmit={submitForm} id="signup-form">
                <label for="username">Username: </label>
                <input id="username" onChange={handleChange}>Username</input> <br />
                <label for="password">Password: </label>
                <input id="password" onChange={handleChange} type="password">Password</input> <br />
                <label for="displayName">Display Name: </label>
                <input id="displayName" onChange={handleChange}>Display Name</input>
                <br />
                <button class={styles.link} type="submit">Sign up</button>
            </form>
        </div>
    )
}

export default Signup