import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import skillValidation from "../skillvalidation";

function NewSkill(props){

    // updatedUser, newSkill, newProficiency, userId
    const [skillData, setSkillData] = createSignal({newSkill:"", newProficiency:""})
    const [creatingSkill, setCreatingSkill] = createSignal(false)     //used for hiding the signup button until the user is successfully created
    const [error, setError] = createSignal(null)

    async function submitForm(e){
        e.preventDefault()
        try{    //validate input on frontend. (If the data is bad, we can catch it before it goes to the server)
            skillValidation.checkSkillname(skillData().newSkill)
            skillValidation.checkSkilllevel(skillData().newProficiency)
        }
        catch(e){
            setError(e)
            return
        }  
        setCreatingSkill(true)
        let res = await fetch(`${props.url}/api/users/profile/updateSkills`,
        {
            method:"POST",
            credentials:'include',
            body:JSON.stringify(skillData()),
            headers: {"Content-Type": "application/json"}
        })
        res = await res.json();
        if(res.error){
            setError(res.error)
        }
        else{       //user was created
            setError(null)
            alert("Skill created successfully!")
            document.getElementById('new-skill-form').reset()
        }
        setCreatingSkill(false)
    }

    function handleChange(e){
        setSkillData({...skillData(),[e.target.id]:e.target.value})
    }

    async function handleClick(e) {
        props.setNewSkill(false);
    }

    return (
        <div>
            <Show when={error()!=null}>
                <p class={styles.error}>{error()}</p>
            </Show>
            <form onSubmit={submitForm} id="new-skill-form">
                <label for="skillname">Skill name: </label>
                <input id="skillname" onChange={handleChange}>Skill Name</input> <br />
                <label for="skilllevel">Skill level (1-10): </label>
                <input id="skilllevel" onChange={handleChange}>Skill Level</input> <br />
                <Show when={creatingSkill()==false}>
                    <button class={styles.button} type="submit" onClick={[handleClick]}>Add Skill</button>
                </Show>
            </form>
        </div>
    )
}

export default NewSkill;