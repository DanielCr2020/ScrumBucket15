import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';

function Signup(){

    const [signupData, setSignupData] = createSignal({username:"",password:"",displayName:""})

    async function submitForm(e){
        e.preventDefault()
        console.log(signupData())
        let res = await fetch(`http://localhost:4000/api/users/signup`,
        {
            method:"POST",
            body:JSON.stringify(signupData()),
            headers: {"Content-Type": "application/json"}
        })
        res = await res.json();
        if(res.error){
            alert(res.error)
        }
    }

    function handleChange(e){
        setSignupData({...signupData(),[e.target.id]:e.target.value})
    }

    return (
        <div>
            <p>Sign up</p>
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