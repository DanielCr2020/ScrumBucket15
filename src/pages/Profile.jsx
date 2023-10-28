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
        <div>
            <Show when={profileInfo()} fallback={<h1>Getting profile info</h1>}>
                <h1 class={styles.username}>Welcome {profileInfo()["displayName"]}!</h1>
                {/* <h1 class={styles.username}>{JSON.stringify(profileInfo())}</h1> */}
                <div class={styles.userProfileInfoDiv}>
                    <div class={styles.skillInterestDiv}>
                        <h3>My Skill Interests:</h3>
                        <div class={styles.profileListDiv}>
                            <list class={styles.profileList}>
                                <li>Knitting</li>
                                <li>Pottery</li>
                                <li>Public Speaking</li>
                                <li>Resume Review</li>
                            </list>
                        </div>
                    </div>
                    <div class={styles.skillTeachDiv}>
                        <h3>My Courses Taught:</h3>
                        <div class={styles.profileListDiv}>
                            <list class={styles.profileList}>
                                <li>Pre calculus</li>
                                <li>Watercolor</li>
                                <li>Poetry</li>
                                {/* <li></li> */}
                            </list>
                        </div>
                    </div>
                </div>
            </Show>
        </div>
    )
}

export default Profile