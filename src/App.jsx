import logo from './logo.svg';
import styles from './App.module.css';
import { createSignal, createEffect } from 'solid-js';

function App() {
  //for fetches that happen multiple times, use createResource
  const [data, setData] = createSignal(null)

  createEffect(async() => {
      let req = await fetch(`http://localhost:4000/api`)
      let data = await req.json()
      setData(data)
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
