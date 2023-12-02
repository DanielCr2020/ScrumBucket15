import styles from './App.module.css';
import { createSignal, createContext, useContext } from 'solid-js';
import Basepage from './pages/Basepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage';
import Profile from './pages/Profile'
import Logout from './pages/Logout';
import Coursepage from './pages/Coursepage';
import RouteGuard from './RouteGuard';
import {Router, Route, Routes, A} from '@solidjs/router';
import HeaderButton from "./HeaderButton";
// import { AuthContext, AuthProvider } from './AuthProvider';

function App() {

  //this will automatically send backend requests to the correct url, whether it be localhost or the vercel site
  const dynamicURL = `http${window.location.hostname=='localhost' ? '://localhost:4000' : 's://cs555-backend.vercel.app'}`
  const [loggedIn, setLoggedIn] = createSignal();

  // async function useAuthContext() {
  //   const context = useContext(AuthContext);
  //   if (!context) {
  //     throw new Error("useAuthContext: cannot find an AuthContext")
  //   }
  //   console.log(context);
  //   return context;
  // }

  // useAuthContext();
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
        <HeaderButton idStr="homeButton" linkStr="/" text="Home"/>
        <Show when={loggedIn()}>
          <HeaderButton idStr="profileButton" linkStr="/profile" text="Profile"/>
          <HeaderButton idStr="logOutButton" linkStr="/logout" text="Log Out"/>
        </Show>
        <Show when={!loggedIn()}>
          <HeaderButton idStr="signUpButton" linkStr="/signup" text="Sign Up"/>
          <HeaderButton idStr="logInButton" linkStr="/login" text="Log In"/>
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
          <Route path="/course" element={<Coursepage url={dynamicURL}/>}/>
        </Route>
        <Route path="*" element={() => <div>Page not found</div>} />
      </Routes>

    </div>
    </Router>
  );
}

export default App;
