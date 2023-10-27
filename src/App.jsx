import styles from './App.module.css';
import { createSignal, createContext, useContext } from 'solid-js';
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
    <div class={styles.App}>    {/* Header bar (Home, profile, login, signup, etc*/}
      <header class={styles.header}>
        <button class={styles.header_button}>
          <A class={styles.link} href="/">Home</A>
        </button>
        <Show when={loggedIn()==true}>
          <button class={styles.header_button}>
            <A class={styles.link} href="/profile">Profile</A>
          </button>
          <button class={styles.header_button}>
            <A class={styles.link} href="/logout">Log Out</A>
          </button>
        </Show>
        <Show when={loggedIn()==false}>
          <button class={styles.header_button}>
            <A class={styles.link} href="/signup">Sign Up</A>
          </button>
          <button class={styles.header_button}>
            <A class={styles.link} href="/login">Log In</A>
          </button>
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
