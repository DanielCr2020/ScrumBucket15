import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import {Router, Route, Routes, A} from "@solidjs/router"

function Basepage(){

    return (
        <div>
            <h1>Welcome to skill sharing site!</h1>
            <A class={styles.link} href="/home">Go to your homepage</A> <br /> <br />
            <A class={styles.link} href="/signup">Click here to register</A> <br /> <br />
            <A class={styles.link} href="/login">Click here to log in</A>
        </div>
    )
}

export default Basepage