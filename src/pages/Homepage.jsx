import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import {Router, Route, Routes, A} from "@solidjs/router"

function Homepage(){

    return (
        <div>
            <h1>Yup, you're logged in alright!</h1>
            <A class={styles.link} href="/profile">Go to your profile</A> <br /> <br />
            <A class={styles.link} href="/logout">Click here to log out</A>
        </div>
    )
}

export default Homepage