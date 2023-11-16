import styles from "../../App.module.css";
import { createSignal, createEffect, onMount } from "solid-js";
import NewSkill from "../NewSkill";

function ProfileSkills(props) {

  const [newSkill, setNewSkill] = createSignal(false);

  async function handleAddSkillClick(e) {
    setNewSkill(true);
  }

  // Currently using placeholder user info until backend info is added.
  return (
    <div>
      <For each={props.profileInfo()["skills"]}>
        {(item) => <li>{JSON.stringify(item)}</li>}
      </For>

      {/* Frontend isn't working for skill display just yet */}

      <li>{JSON.stringify(props.profileInfo()["skills"])}</li>
      <Show when={JSON.stringify(props.profileInfo()["skills"]) == "{}"}>
        <li>No skills, add one!</li>
      </Show>
      <br></br>
      <Show when={!newSkill()}>
        <button class={styles.newSkillButton} onClick={[handleAddSkillClick]}>
          Click to add a skill!
        </button>
      </Show>
      <Show when={newSkill()}>
        <NewSkill
          url={props.url}
          element={props.element}
          setNewSkill={setNewSkill}
          updatedUser={JSON.stringify(props.profileInfo()["displayName"])}
        />
      </Show>
    </div>
  );
}

export default ProfileSkills;
