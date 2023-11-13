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

    
    // Currently using placeholder user info until backend info is added.
    return (
        <list class={styles.profileList}>
            <li>Knitting</li>
            <li>Pottery</li>
            <li>Public Speaking</li>
            <li>Resume Review</li>
        </list>
    )
}

export default Profile