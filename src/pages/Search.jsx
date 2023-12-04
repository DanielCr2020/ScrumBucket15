import styles from "../App.module.css";
import { createSignal } from "solid-js";

function Search(props) {
  const [searchSkillsHaveAll, setSearchSkillsHaveAll] = createSignal(false);
  const [searchSkillInterestsHaveAll, setSearchSkillInterestsHaveAll] = createSignal(false);
  const [searchResults, setSearchResults] = createSignal();

  async function searchSkills(e) {
    e.preventDefault();
    let res1 = await fetch(`${props.url}/api/skills/searchBySkills`, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ skills: e.target[2].value, mustHaveAll: searchSkillsHaveAll() }),
      headers: { "Content-Type": "application/json" }
    });
    res1 = await res1.json();
    setSearchResults(res1);
  }

  async function searchSkillInterests(e) {
    e.preventDefault();
    let res1 = await fetch(`${props.url}/api/skills/searchBySkillInterests`, {
      method: "POST",
      credentials: 'include',
      body: JSON.stringify({ skills: e.target[2].value, mustHaveAll: searchSkillInterestsHaveAll() }),
      headers: { "Content-Type": "application/json" }
    });
    res1 = await res1.json();
    setSearchResults(res1);
  }

  return (
    <div>
      <form onSubmit={searchSkillInterests}>
        <h3>Search for users who are <u> looking for</u> all or any of these skills:</h3>
        <input
          type="radio"
          id="allInterests"
          name="allOrAnyInterest"
          value="true"
          onChange={(e) => setSearchSkillInterestsHaveAll(e.target.value)}
        />
        <label htmlFor="allInterests">All</label>
        <input
          type="radio"
          id="anyInterests"
          name="allOrAnyInterest"
          value="false"
          onChange={(e) => setSearchSkillInterestsHaveAll(e.target.value)}
        />
        <label htmlFor="anyInterests">Any</label>
        <br />
        <input
          class={styles.userSearchBar}
          type="text"
          placeholder="Search for a user by skill interests... (separate multiple skills with a comma)"
        />
        <button type="submit">Search</button>
      </form>
      <br />
      <br />
      <form onSubmit={searchSkills}>
        <h3>Search for users who <u> know</u> all or any of these skills:</h3>
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
        <button type="submit">Search</button>
      </form>
      <For each={searchResults()}>
        {(item) => <div>{JSON.stringify(item)}</div>}
      </For>
    </div>
  );
}

export default Search;
