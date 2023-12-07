import styles from "../App.module.css";
import { createSignal } from "solid-js";

function Search(props) {
  const [searchSkillsHaveAll, setSearchSkillsHaveAll] = createSignal(false);
  const [searchSkillInterestsHaveAll, setSearchSkillInterestsHaveAll] =
    createSignal(false);
  const [searchResults, setSearchResults] = createSignal();

  async function searchSkills(e) {
    e.preventDefault();
    let res1 = await fetch(`${props.url}/api/skills/searchBySkills`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        skills: e.target[2].value,
        mustHaveAll: searchSkillsHaveAll(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    res1 = await res1.json();
    setSearchResults(res1);
  }

  async function searchSkillInterests(e) {
    e.preventDefault();
    let res1 = await fetch(`${props.url}/api/skills/searchBySkillInterests`, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify({
        skills: e.target[2].value,
        mustHaveAll: searchSkillInterestsHaveAll(),
      }),
      headers: { "Content-Type": "application/json" },
    });
    res1 = await res1.json();
    setSearchResults(res1);
  }

  return (
    <div>
      <form onSubmit={searchSkills}>
        <h3>
          What do you want to learn today? (search by all or any skills listed)
        </h3>
        <input
          type="radio"
          id="allSkills"
          name="allOrAnySkill"
          value="true"
          onChange={(e) => setSearchSkillsHaveAll(e.target.value)}
        />
        <label htmlFor="allSkills">All</label>
        <input
          type="radio"
          id="anySkills"
          name="allOrAnySkill"
          value="false"
          onChange={(e) => setSearchSkillsHaveAll(e.target.value)}
        />
        <label htmlFor="anySkills">Any</label>
        <br />
        <input
          class={styles.userSearchBar}
          type="text"
          placeholder="Search for a user by known skills... (separate multiple skills with a comma)"
        />
        <button type="submit">Submit</button>
      </form>
      <For each={searchResults()}>
        {(item) => <div class={styles.displayProfiles}> 
          <p ><b>{item["displayName"]} </b></p> 
          <For each={item["skills"]}>
            {(skill) => <div class={styles.skillDisplayFlexbox}><div class={styles.skillNameTextDisplay}>Skill: {skill["skillName"]}</div> <div class={styles.skillProficiencyTextDisplay}>Proficiency: {skill["proficiency"]} </div></div>}
          </For>
          </div> }
      </For>
    </div>
  );
}

export default Search;
