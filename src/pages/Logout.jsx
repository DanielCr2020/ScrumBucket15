import { on, onMount } from "solid-js"

function Logout(props){
    onMount(async() => {
        await fetch(`${props.url}/api/users/logout`,{credentials:'include'})
    })

    window.location.href='/'
    return (
        <h1>You've been logged out</h1>
    )
}

export default Logout