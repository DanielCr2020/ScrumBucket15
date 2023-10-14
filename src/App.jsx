import styles from './App.module.css';
import { createSignal, createEffect } from 'solid-js';
import Basepage from './pages/Basepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Homepage from './pages/Homepage'
import {Router, Route, Routes, A} from '@solidjs/router'

function App() {
  //for fetches that happen multiple times, use createResource
  // const [data, setData] = createSignal(null)

  // createEffect(async() => {
  //     let req = await fetch(`https://cs555-backend.vercel.app/api`)
  //     let data = await req.json()
  //     setData(data)
  // })

  return (
    <Router>
    <div class={styles.App}>
      <header class={styles.header}>
        <A class={styles.link} href="/">Home</A>
        <A class={styles.link} href="/signup">Sign up</A>
        <A class={styles.link} href="/login">Log in</A>
      </header>
      <Routes>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Basepage} />
        <Route path="/home" component={Homepage} />
      </Routes>

    </div>
    </Router>
  );
}

export default App;
