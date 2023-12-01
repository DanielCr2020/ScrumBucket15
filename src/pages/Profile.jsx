import styles from '../App.module.css'
import { createSignal, createEffect, onMount } from 'solid-js';
import {useNavigate, A} from "@solidjs/router";
import NewSkill from "./NewSkill";

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
        // console.log("profile")
        getProfileInfo().then(info => {setProfileInfo(info)})
        
    })

    const [newSkill, setNewSkill] = createSignal(false);

    async function handleClick(e) {
        setNewSkill(true);
    }

    // Currently using placeholder user info until backend info is added.
    return (
        <div>
            <Show when={profileInfo()} fallback={<h1>Getting profile info</h1>}>
                <h1 class={styles.username}>Welcome {profileInfo()["displayName"]}!</h1>
                {/* <h1 class={styles.username}>{JSON.stringify(profileInfo())}</h1> */}
                <h2>Contact Information:</h2>
                <div class={styles.contactDiv}>
                    <h3 class={styles.contactText}>Phone Number: {profileInfo()["phoneNumber"]}</h3>
                    <h3 class={styles.contactText}>Email: {profileInfo()["emailAddress"]}</h3>
                </div>
                <div class={styles.userProfileInfoDiv}>
                    <div class={styles.skillInterestDiv}>
                        <h3 class={styles.skillHeader}>My Skills:</h3>
                        <div class={styles.profileListDiv}>
                            <list class={styles.profileList}>
                                {/* patch request to api/users/profile/updateSkills */}
                                <ul>
                                    <For each={profileInfo()["skills"]}>
                                        {(item) => (
                                            <li>
                                                <div>  <strong> {item.skillName} </strong> -- Proficiency: {item.proficiency} </div>
                                            </li>
                                        )}
                                    </For>
                                </ul>
                                <Show when={profileInfo()["skills"].length === 0}>
                                    <li>No skills to share, add one!</li>
                                </Show>
                                <br></br>
                                <Show when={!newSkill()}>
                                    <button class={styles.newSkillButton} onClick={[handleClick]}>Click to Add, Update, or Delete a Skill!</button>
                                </Show>
                                <Show when={newSkill()}>
                                    <NewSkill 
                                        url={props.url}
                                        element={props.element} 
                                        setNewSkill={setNewSkill} 
                                        updatedUser={JSON.stringify(profileInfo()["displayName"])}/>
                                </Show>
                            </list>
                        </div>
                    </div>
                </div>
                {/* Add new section for "Looking For:" skills 
                <div class={styles.skillInterestDiv}> 
                        <h3 class={styles.skillHeader}>Looking To Learn:</h3>
                        <div class={styles.profileListDiv}>
                            <list class={styles.profileList}>
                                <ul>
                                    <For each={profileInfo()["lookingForSkills"]}>
                                            {(item) => (
                                                <li>
                                                    <div>  <strong> {item.skillName} </strong> -- Proficiency: {item.proficiency} </div>
                                                </li>
                                            )}
                                    </For>
                                </ul>
                                <Show when={profileInfo()["lookingForSkills"].length === 0}>
                                    <li>No skills to learn, add one!</li>
                                </Show>
                                button to add/delete skills user wants to learn
                            </list>
                        </div>
                    </div> */}
            </Show>
        </div>
    )
}

export default Profile