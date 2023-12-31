import styles from "../App.module.css";
import { createSignal, createEffect, onMount, createResource } from "solid-js";
import { useNavigate, A } from "@solidjs/router";
import NewSkill from "./NewSkill";
import UpdateUser from "./UpdateUser";

function Profile(props) {
  const navigate = useNavigate();
  async function getProfileInfo() {
    const info = await fetch(`${props.url}/api/users/profile`, {
      credentials: "include",
    });
    return await info.json();
  }
  const [profileInfo, setProfileInfo] = createSignal();
  const [skills, setSkills] = createSignal();

  const [newSkill, setNewSkill] = createSignal(false);

  async function handleAddSkillClick(e) {
    setNewSkill(true);
  }

  const [newSkillInterest, setNewSkillInterest] = createSignal(false);

  async function handleAddSkillInterestClick(e) {
    setNewSkillInterest(true);
  }

  const [editProfile, setEditProfile] = createSignal(false);

  async function handleEditProfileClick(e) {
    setEditProfile(true);
  }

  const [updateCount, setUpdateCount] = createSignal(0);

  onMount(() => {
    // console.log("profile")
    getProfileInfo().then((info) => {
      setProfileInfo(info);
    });
  }, [updateCount()]);

  // Currently using placeholder user info until backend info is added.
  return (
    <div>
      <Show when={profileInfo()} fallback={<h1>Getting profile info</h1>}>
        <div class={styles.userProfileHeaderDiv}>
          <div class={styles.userProfileContactDiv}>
            <h1 class={styles.username}>
              Welcome {profileInfo()["displayName"]}!
            </h1>
            {/* <h1 class={styles.username}>{JSON.stringify(profileInfo())}</h1> */}
            <h2>Contact Information:</h2>
            <div class={styles.contactDiv}>
              <h3 class={styles.contactText}>{profileInfo()["contactInfo"]}</h3>
            </div>
          </div>
          <div class={styles.userProfileDescriptionDiv}>
            <p>
              {profileInfo()["description"]}
            </p>
            <Show when={!editProfile()}>
              <button
                class={styles.editUserInfoButton}
                onClick={handleEditProfileClick}
              >
                Edit User Info
              </button>
            </Show>
            <Show when={editProfile()}>
              <UpdateUser 
                url={props.url}
                element={props.element}
                setEditProfile={setEditProfile}
                updatedUser={JSON.stringify(profileInfo()["displayName"])}
                setUpdateCount={setUpdateCount}
              />
            </Show>
          </div>
        </div>
        <br></br>
        <br></br>
        <div class={styles.userProfileInfoDiv}>
          <div class={styles.skillInterestDiv}>
            <h3 class={styles.skillHeader}>My Known Skills:</h3>
            <div class={styles.profileListDiv}>
              <list class={styles.profileList}>
                {/* patch request to api/users/profile/updateSkills */}
                <Show when={JSON.stringify(profileInfo()["skills"]) !== "[]"}>
                  <For each={profileInfo()["skills"]}>
                    {(item) => (
                      <li>
                        {JSON.stringify(item["skillName"]).replaceAll("\"", "")} - proficiency:{" "}
                        {JSON.stringify(item["proficiency"])}
                      </li>
                    )}
                  </For>
                </Show>
                <Show when={JSON.stringify(profileInfo()["skills"]) == "[]"}>
                  <li>No skills, add one!</li>
                </Show>
                <br></br>
                <Show when={!newSkill()}>
                  <button
                    class={styles.newSkillButton}
                    onClick={[handleAddSkillClick]}
                  >
                    Click to modify your skills!
                  </button>
                </Show>
                <Show when={newSkill()}>
                  <NewSkill
                    url={props.url}
                    element={props.element}
                    setNewSkill={setNewSkill}
                    updatedUser={JSON.stringify(profileInfo()["displayName"])}
                    setUpdateCount={setUpdateCount}
                    isSkillInterest={false}
                  />
                </Show>
              </list>
            </div>
          </div>
          <div class={styles.skillTeachDiv}>
            <h3 class={styles.skillHeader}>My Skill Interests:</h3>
            <div class={styles.profileListDiv}>
              <list class={styles.profileList}>
                {/* patch request to api/users/profile/updateSkills */}
                <Show when={JSON.stringify(profileInfo()["wantedSkills"]) !== "[]"}>
                  <For each={profileInfo()["wantedSkills"]}>
                    {(item) => (
                      <li>
                        {JSON.stringify(item).replaceAll("\"", "")}
                      </li>
                    )}
                  </For>
                </Show>
                <Show when={JSON.stringify(profileInfo()["skills"]) == "[]"}>
                  <li>No skills, add one!</li>
                </Show>
                <br></br>
                <Show when={!newSkillInterest()}>
                  <button
                    class={styles.newSkillButton}
                    onClick={[handleAddSkillInterestClick]}
                  >
                    Click to modify your skill interests!
                  </button>
                </Show>
                <Show when={newSkillInterest()}>
                  <NewSkill
                    url={props.url}
                    element={props.element}
                    setNewSkill={setNewSkillInterest}
                    updatedUser={JSON.stringify(profileInfo()["displayName"])}
                    setUpdateCount={setUpdateCount}
                    isSkillInterest={true}
                  />
                </Show>
              </list>
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}

export default Profile;
