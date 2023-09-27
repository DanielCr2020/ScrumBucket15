import logo from './logo.svg';
import styles from './App.module.css';
import axios from 'axios'
import { createSignal, createEffect } from 'solid-js';

function App() {
  const [data, setData] = createSignal(null)

  createEffect(async() => {
    let req;
    try{
      req = await axios.get(`http://localhost:4000/api`)
      console.log("req:",req)
      setData(req.data)
    }
    catch(e){
      req = e
    }
  })

  return (
    <div class={styles.App}>
      <p>{data()}</p>
      <header class={styles.header}>
        <img src={logo} class={styles.logo} alt="logo" />
        <p>
          Better call Saulid
        </p>
        <a
          class={styles.link}
          href="https://github.com/solidjs/solid"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn Solid
        </a>
      </header>
    </div>
  );
}

export default App;
