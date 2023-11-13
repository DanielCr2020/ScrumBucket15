import styles from './App.module.css';
import {A} from '@solidjs/router';

function HeaderButton(props) {
  return (
    <button id={props.idStr} class={styles.header_button}>
        <A class={styles.link} href={props.linkStr}>{props.text}</A>
    </button>
  );
}

export default HeaderButton;
