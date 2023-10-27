import styles from '../App.module.css'
import { createSignal, createEffect, onMount } from 'solid-js';
import {useNavigate} from "@solidjs/router"

function Profile(props){
    const navigate=useNavigate()
    async function getProfileInfo(){
        const info = await fetch(`${props.url}/api/users/profile`,{
            credentials:'include'
        })
        return await info.json()
    }
    const [profileInfo, setProfileInfo] = createSignal()

    onMount(() => {
        console.log("profile")
        getProfileInfo().then(info => {setProfileInfo(info)})
    })

    
    return (
        <div>
            <Show when={profileInfo()} fallback={<h1>loading profile page...</h1>}>
                <h1>Welcome {profileInfo().displayName} !</h1>
                <h2>Username: {profileInfo().username}</h2>
                <div class={styles.bioBorder}>
                    <h3>Your Bio</h3>
                    <p>{profileInfo().description}</p>
                </div>
            </Show>
        </div>
    )
}

export default Profile