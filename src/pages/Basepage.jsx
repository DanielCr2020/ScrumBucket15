import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import {Router, Route, Routes, A} from "@solidjs/router"

function Basepage(){

    return (
        <div class={styles.backgroundImage}>
            <h1>Welcome to the Skill Swap Site!</h1>
            <h2>Connect with your local community by learning skills taught by those around you.</h2>
            <A class={styles.link} href="/home">Go to your Homepage</A> <br /> <br />
        </div>
    )
}

export default Basepage