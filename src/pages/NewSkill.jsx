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

  async function submitForm(e) {
    e.preventDefault();
    console.log("skill data:", skillData());
    try {
      //validate input on frontend. (If the data is bad, we can catch it before it goes to the server)
      clientValidation.checkSkillname(skillData().newSkill);
      clientValidation.checkSkilllevel(skillData().newProficiency);
    } catch (e) {
      setError(e);
      console.log("Client error:", e);
      return;
    }
    setCreatingSkill(true);
    console.log("props:", props);
    let res = await fetch(`${props.url}/api/users/profile/updateSkills`, {
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
  }

  function handleChange(e) {
    setSkillData({ ...skillData(), [e.target.id]: e.target.value });
  }

  return (
    <div>
      <Show when={error() != null}>
        <p class={styles.error}>{error()}</p>
      </Show>
      <form onSubmit={submitForm} id="new-skill-form">
        <label for="newSkill">Skill name: </label>
        <input
          id="newSkill"
          onChange={handleChange}
          placeholder={"Enter a skill name"}
        >
          Skill Name
        </input>{" "}
        <br />
        <label for="newProficiency">Skill level (1-10): </label>
        <input
          id="newProficiency"
          onChange={handleChange}
          placeholder={"Enter 0 to delete a skill"}
        >
          Skill Level
        </input>{" "}
        <br />
        <Show when={creatingSkill() == false || error() != null}>
          <button class={styles.button} type="submit">
            Add Skill
          </button>
        </Show>
      </form>
    </div>
  );
}

export default NewSkill;
