import styles from "../App.module.css";
import { createSignal, createEffect } from "solid-js";
import { Router, Route, Routes, A } from "@solidjs/router";

function Homepage() {
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
      <form>
        <p>Search for users who are looking for all or any of these skills:</p>
         {" "}
        <input
          type="radio"
          id="allInterests"
          name="allOrAnyInterest"
          value="HTML"
        />
          <label for="allInterests">All</label>
         {" "}
        <input
          type="radio"
          id="anyInterests"
          name="allOrAnyInterest"
          value="CSS"
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
      <form>
      <p>Search for users who know all or any of these skills:</p>
         {" "}
        <input
          type="radio"
          id="allSkills"
          name="allOrAnySkill"
          value="HTML"
        />
          <label for="allSkills">All</label>
         {" "}
        <input
          type="radio"
          id="anySkills"
          name="allOrAnySkill"
          value="CSS"
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
    </div>
  );
}

export default Homepage;
