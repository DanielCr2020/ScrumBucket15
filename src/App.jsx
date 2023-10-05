import styles from './App.module.css';
import { createSignal, createEffect } from 'solid-js';
import Homepage from './pages/Homepage';
import Signup from './pages/Signup';
import Login from './pages/Login';
import {Router, Route, Routes, A} from '@solidjs/router'

function App() {
  //for fetches that happen multiple times, use createResource
  const [data, setData] = createSignal(null)

  createEffect(async() => {
      let req = await fetch(`http://localhost:4000/api`)
      let data = await req.json()
      setData(data)
  })

  return (
    <Router>
    <div class={styles.App}>
      <p>{data()}</p>
      <header class={styles.header}>
        <A class={styles.link} href="/">Home</A>
      </header>
      <Routes>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Homepage} />
      </Routes>
    </div>
    </Router>
  );
}

export default App;
