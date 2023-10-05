import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import {Router, Route, Routes, A} from "@solidjs/router"

function Homepage(){

    return (
        <div>
            <p>This is the homepage</p>
            <A class={styles.link} href="/signup">Click here to register</A> <br />
            <A class={styles.link} href="/login">Click here to log in</A>
        </div>
    )
}

export default Homepage