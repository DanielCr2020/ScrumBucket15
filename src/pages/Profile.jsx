import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import {Router, Route, Routes, A} from "@solidjs/router"

function Profile(){

    return (
        <div>
            <h1>Log in to access your profile page!</h1>
            <A class={styles.link} href="/login">Click here to log in</A>
        </div>
    )
}

export default Profile