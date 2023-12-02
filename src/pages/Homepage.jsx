import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import {Router, Route, Routes, A} from "@solidjs/router"

function Homepage(){

    return (
        <div class={styles.backgroundImage}>
            <h1>You're logged in!</h1>
            <A class={styles.link} href="/profile">Go to your profile</A> <br /> <br />
            <A class={styles.link} href="/logout">Click here to log out</A> <br /> <br />
            <A class={styles.link} href="/course">Click here to view a course!</A>
        </div>
    )
}

export default Homepage