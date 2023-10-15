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
            <Show when={profileInfo()} fallback={<h1>Getting profile info</h1>}>
                <h1>{JSON.stringify(profileInfo())}</h1>
            </Show>
        </div>
    )
}

export default Profile