import styles from "../App.module.css";
import { createSignal, createEffect } from "solid-js";
import clientValidation from "../clientValidation";

function NewSkill(props) {
  // updatedUser, newSkill, newProficiency, userId
  const [skillData, setSkillData] = createSignal({
    newSkill: "",
    newProficiency: "",
  });
  const [creatingSkill, setCreatingSkill] = createSignal(false); //used for hiding the signup button until the user is successfully created
  const [error, setError] = createSignal(null);

  async function submitAddSkillForm(e) {
    e.preventDefault();
    console.log("skill data:", skillData());
    try {
      //validate input on frontend. (If the data is bad, we can catch it before it goes to the server)
      clientValidation.checkSkillname(skillData().newSkill);
      if(!props.isSkillInterest) clientValidation.checkSkilllevel(skillData().newProficiency)
    } catch (e) {
      setError(e);
      console.log("Client error:", e);
      return;
    }
    setCreatingSkill(true);
    console.log("props:", props);
    let res = await fetch(`${props.url}/api/users/profile/update${props.isSkillInterest ? 'Wanted' : ''}Skills`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(skillData()),
      headers: { "Content-Type": "application/json" },
    });
    res = await res.json();
    if (res.error) {
      setError(res.error);
      console.log(res.error);
    } else {
      //skill was created
      setError(null);
      // alert("Skill created successfully!")
      document.getElementById("new-skill-form").reset();
    }
    setCreatingSkill(false);

    props.setUpdateCount((prevCount) => prevCount + 1);
  }

  function handleChange(e) {
    setSkillData({ ...skillData(), [e.target.id]: e.target.value, isSkillInterest:props.isSkillInterest });
  }

  return (
    <div>
      <Show when={error() != null}>
        <p class={styles.error}>{error()}</p>
      </Show>
      <form onSubmit={submitAddSkillForm} id="new-skill-form">
        <label for="newSkill">Skill name: </label>
        <input
          id="newSkill"
          onChange={handleChange}
          placeholder={"Enter a skill name"}
        >
          Skill Name
        </input>{" "}
        <br />
        <Show when={props.isSkillInterest==false}>
        <label for="newProficiency">Skill level (1-10): </label>
        <input
          id="newProficiency"
          onChange={handleChange}
          placeholder={"Enter 0 to delete a skill"}
        >
          Skill Level
        </input>{" "}
        <br />
        </Show>
        <Show when={creatingSkill() == false || error() != null}>
          <button class={styles.button} type="submit">
            Update Skill
          </button>
          <Show when={props.isSkillInterest}>
            <br/>
            <input type="checkbox" id="remove" onChange={handleChange}>Remove this skill interest</input>
            <label for="remove">Remove this skill interest</label>
          </Show>
        </Show>
      </form>
    </div>
  );
}

export default NewSkill;
