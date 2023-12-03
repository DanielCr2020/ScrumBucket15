import styles from "../App.module.css";
import { createSignal, createEffect } from "solid-js";
import { Router, Route, Routes, A } from "@solidjs/router";

function Homepage(props) {

  const [searchSkillsHaveAll,setSearchSkillsHaveAll] = createSignal(false)
  const [searchSkillInterestsHaveAll,setSearchSkillInterestsHaveAll] = createSignal(false)
  const [searchResults,setSearchResults] = createSignal()
  async function searchSkills(e){
    e.preventDefault()
    console.log(e.target[2].value)
    let res1 = await fetch(`${props.url}/api/skills/searchBySkills`,
    {
      method:"POST",
      credentials:'include',
      body:JSON.stringify({skills:e.target[2].value,mustHaveAll:searchSkillsHaveAll()}),
      headers: {"Content-Type": "application/json"}
    })
    res1 = await res1.json();
    setSearchResults(res1)
  }

  async function searchSkillInterests(e){
    e.preventDefault()
    console.log(e.target[2].value)
    let res1 = await fetch(`${props.url}/api/skills/searchBySkillInterests`,
    {
      method:"POST",
      credentials:'include',
      body:JSON.stringify({skills:e.target[2].value,mustHaveAll:searchSkillInterestsHaveAll()}),
      headers: {"Content-Type": "application/json"}
    })
    res1 = await res1.json();
    setSearchResults(res1)
  }

  return (
    <div class={styles.backgroundImage}>
      <h1>You're logged in!</h1>
      <A class={styles.link} href="/profile">
        Go to your profile
      </A>{" "}
      <br /> <br />
      <A class={styles.link} href="/logout">
        Click here to log out
      </A>{" "}
      <br /> <br />
      <form onSubmit={searchSkillInterests}>
        <p>Search for users who are looking for all or any of these skills:</p>
         {" "}
        <input
          type="radio"
          id="allInterests"
          name="allOrAnyInterest"
          value="true"
          onChange={(e) => setSearchSkillInterestsHaveAll(e.target.value) }

        />
         <label for="allInterests">All</label>
         {" "}
        <input
          type="radio"
          id="anyInterests"
          name="allOrAnyInterest"
          value="false"
          onChange={(e) => setSearchSkillInterestsHaveAll(e.target.value) }
        />
         <label for="anyInterests">Any</label>
        <br></br>
        <input
          class={styles.userSearchBar}
          type="text"
          placeholder="Search for a user by skill interests... (separate multiple skills with a comma)"
        />
        <button type="submit">Search</button>
      </form>
      <br></br>
      <br></br>
      <form onSubmit={searchSkills}>
      <p>Search for users who know all or any of these skills:</p>
        {" "}
        <input
          type="radio"
          id="allSkills"
          name="allOrAnySkill"
          value="true"
          onChange={(e) => setSearchSkillsHaveAll(e.target.value)}
        />
         <label for="allSkills">All</label>
        {" "}
        <input
          type="radio"
          id="anySkills"
          name="allOrAnySkill"
          value="false"
          onChange={(e) => setSearchSkillsHaveAll(e.target.value) }
        />
         <label for="anySkills">Any</label>
        <br></br>
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

export default Homepage;
