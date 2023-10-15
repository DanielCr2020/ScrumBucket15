import styles from './App.module.css';
import { createSignal, createEffect, onMount } from 'solid-js';
import Basepage from './pages/Basepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile'
import Logout from './pages/Logout';
import RouteGuard from './RouteGuard';
import {Router, Route, Routes, A} from '@solidjs/router'

function App() {

  //this will automatically send backend requests to the correct url, whether it be localhost or the vercel site
  const dynamicURL = `http${window.location.hostname=='localhost' ? '://localhost:4000' : 's://cs555-backend.vercel.app'}`
  const [loggedIn,setLoggedIn] = createSignal()

  async function fetchLogin(){
    let res = await fetch(`${dynamicURL}/api/users/login`,{credentials:'include'})
    let res1 = await res.json();
    return res1.loggedIn
  }
  fetchLogin().then(result => setLoggedIn(result))

  return (
    <Router>
    <div class={styles.App}>
      <header class={styles.header}>
        <A class={styles.link} href="/">Home</A>
        <Show when={loggedIn()==true}>
          <A class={styles.link} href="/profile">Profile</A>
          <A class={styles.link} href="/logout">Log out</A>
        </Show>
        <Show when={loggedIn()==false}>
          <A class={styles.link} href="/signup">Sign up</A>
          <A class={styles.link} href="/login">Log in</A>
        </Show>

      </header>
      <Routes>
        <Route path="/signup" element={<Signup url={dynamicURL}/>} />
        <Route path="/login" element={<Login url={dynamicURL}/> } />
        <Route path="/" element={<Basepage url={dynamicURL}/>} />
        <Route path="/" element={<RouteGuard url={dynamicURL}/>}>
          <Route path="/home" element={<Homepage url={dynamicURL}/>}/>
          <Route path="/profile" element={<Profile url={dynamicURL}/>} />
          <Route path="/logout" element={<Logout url={dynamicURL}/>}/>
        </Route>
        <Route path="*" element={() => <div>Page not found</div>} />
      </Routes>

    </div>
    </Router>
  );
}

export default App;
