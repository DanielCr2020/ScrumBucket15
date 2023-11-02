import styles from '../App.module.css'
import { createSignal, createEffect } from 'solid-js';
import {Router, Route, Routes, A} from "@solidjs/router"

function Coursepage(){

    return (
        <div>
            <h1 class={styles.courseTitle}>Demo Course</h1>
            <h3>Times offered: W 5pm - 6pm, F 3pm - 4pm</h3>
            <p>
                This is a description of a course to use as a deomstration
                for when we implement courses in the database.
            </p>
            <button class={styles.courseRegistrationButton}>Sign up for Wednesday</button>
            <button class={styles.courseRegistrationButton}>Sign up for Friday</button>
        </div>
    )
}

export default Coursepage