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
                    <h3 class={styles.contactText}>(999)-999-9999</h3>
                    <h3 class={styles.contactText}>demo_email@somesite.com</h3>
                </div>
                <div class={styles.userProfileInfoDiv}>
                    <div class={styles.skillInterestDiv}>
                        <h3 class={styles.skillHeader}>My Known Skills:</h3>
                        <div class={styles.profileListDiv}>
                            <list class={styles.profileList}>
                                {/* patch request to api/users/profile/updateSkills */}
                                <For each={profileInfo()["skills"]}>
                                    {(item) => <div>{JSON.stringify(item)}</div>}
                                </For>
                                <Show when={JSON.stringify(profileInfo()["skills"]) == "{}"}>
                                    <li>No skills, add one!</li>
                                </Show>
                                <br></br>
                                <Show when={!newSkill()}>
                                    <button class={styles.newSkillButton} onClick={[handleClick]}>Click to add, update, or delete a skill!</button>
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
                    <Show when={profileInfo()["isMentor"]==true}>
                        <div class={styles.skillTeachDiv}>
                            <h3 class={styles.skillHeader}>My Skill Interests:</h3>
                            <div class={styles.profileListDiv}>
                                <list class={styles.profileList}>
                                    <li>Pre calculus</li>
                                    <li>Watercolor</li>
                                    <li>Poetry</li>
                                </list>
                            </div>
                        </div>
                    </Show>
                </div>
            </Show>
        </div>
    )
}

export default Profile