import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import clientValidation from '../clientValidation.js'
import { useNavigate } from '@solidjs/router';

function Signup(props){

    const [signupData, setSignupData] = createSignal({username:"", email:"", password:"",displayName:"", phoneNumber:""})
    const [creatingUser, setCreatingUser] = createSignal(false)     //used for hiding the signup button until the user is successfully created
    const [error, setError] = createSignal(null)

    const navigate=useNavigate()

    async function submitForm(e){
        e.preventDefault()
        try{    //validate input on frontend. (If the data is bad, we can catch it before it goes to the server)
            clientValidation.checkUsername(signupData().username)
            clientValidation.checkEmail(signupData().email)
            clientValidation.checkPhoneNumber(signupData().phoneNumber)
            clientValidation.checkPassword(signupData().password)
            clientValidation.checkDisplayName(signupData().displayName)
        }
        catch(e){
            setError(e)
            return
        }  
        setCreatingUser(true)
        let res = await fetch(`${props.url}/api/users/signup`,
        {
            method:"POST",
            credentials:'include',
            body:JSON.stringify(signupData()),
            headers: {"Content-Type": "application/json"}
        })
        res = await res.json();
        if(res.error){
            setError(res.error)
        }
        else{       //user was created
            setError(null)
            alert("Account created successfully! You will now be logged in")
            document.getElementById('signup-form').reset()
            //log them in
            let loginResponse = await fetch(`${props.url}/api/users/login`,
            {
                method:"POST",
                credentials:'include',
                body:JSON.stringify({username:signupData().username,password:signupData().password}),
                headers: {"Content-Type": "application/json"}
            })
            loginResponse = await loginResponse.json()
            if(loginResponse.error){
                setError("Login error: "+loginResponse.error)
            }
            else{       //no error
                setError(null)
                window.location.href=('/home')
            }
        }
        setCreatingUser(false)
    }

    function handleChange(e){
        setSignupData({...signupData(),[e.target.id]:e.target.value})
    }

    return (
        <div class={styles.backgroundImage}>
            <h2>Sign Up</h2>
            <Show when={error()!=null}>
                <p class={styles.error}>{error()}</p>
                </Show>
            <form onSubmit={submitForm} id="signup-form" class={styles.formGroup}>
                <div class={styles.formGroup}>
                    <label for="username">Username:</label>
                    <input id="username" onChange={handleChange} placeholder="Username" />
                </div>
                <div class={styles.formGroup}>
                    <label for="email">Email:</label>
                    <input id="email" onChange={handleChange} placeholder="Email" />
                </div>
                <div class={styles.formGroup}>
                    <label for="phoneNumber">Phone Number:</label>
                    <input id="phoneNumber" onChange={handleChange} placeholder="(xxx)-xxx-xxxx" />
                </div>
                <div class={styles.formGroup}>
                    <label for="password">Password:</label>
                    <input id="password" onChange={handleChange} type="password" placeholder="Password" />
                </div>
                <div class={styles.formGroup}>
                    <label for="displayName">Display Name:</label>
                    <input id="displayName" onChange={handleChange} placeholder="Display Name" />
                </div>
                <Show when={creatingUser() == false}>
                    <button class={styles.button} type="submit">Sign Up</button>
                </Show>
            </form>
        </div>
    )
}

export default Signup