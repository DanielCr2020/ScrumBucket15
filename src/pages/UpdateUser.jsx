import styles from "../App.module.css";
import { createSignal, createEffect } from "solid-js";
import clientValidation from "../clientValidation";

function UpdateUser(props) {
  // updatedUser, newSkill, newProficiency, userId
  const [userData, setUserData] = createSignal({
    newEmail: "",
    newDescription: "",
  });
  const [creatingUser, setCreatingUser] = createSignal(false); //used for hiding the signup button until the user is successfully created
  const [error, setError] = createSignal(null);

  async function submitForm(e) {
    e.preventDefault();
    console.log("skill data:", userData());
    try {
      //validate input on frontend. (If the data is bad, we can catch it before it goes to the server)
      clientValidation.checkEmail(userData().newEmail);
      clientValidation.checkDesc(userData().newDescription);
    } catch (e) {
      setError(e);
      console.log("Client error:", e);
      return;
    }
    setCreatingUser(true);
    console.log("props:", props);
    // Whatever the API call is for this
    let res = await fetch(`${props.url}/api/users/profile/updateUser`, {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(userData()),
      headers: { "Content-Type": "application/json" },
    });
    res = await res.json();
    if (res.error) {
      setError(res.error);
      console.log(res.error);
    } else {
      //skill was created
      setError(null);
      alert("Skill created successfully!");
      document.getElementById("user-update-form").reset();
    }
    setCreatingUser(false);
  }

  function handleChange(e) {
    setUserData({ ...userData(), [e.target.id]: e.target.value });
  }

  return (
    <div>
      <Show when={error() != null}>
        <p class={styles.error}>{error()}</p>
      </Show>
      <form onSubmit={submitForm} id="user-update-form">
        <label for="newEmail">New Email: </label>
        <input id="newEmail" onChange={handleChange}>
          Email
        </input>{" "}
        <br />
        <label for="newDescription">New Description: </label>
        <input id="newDescription" onChange={handleChange}>
          Description
        </input>{" "}
        <br />
        <Show when={creatingUser() == false || error() != null}>
          <button class={styles.button} type="submit">
            Update User
          </button>
        </Show>
      </form>
    </div>
  );
}

export default UpdateUser;
