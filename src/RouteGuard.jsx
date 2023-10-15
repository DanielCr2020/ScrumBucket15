//https://www.thisdot.co/blog/how-to-authenticate-your-solidjs-routes-with-solid-router/

import { useNavigate, Outlet } from "@solidjs/router";
import { createSignal,createEffect } from "solid-js";

function RouteGuard(props){  //Used to redirect if the user is not logged in
    const navigate=useNavigate()
    const [loggedIn,setLoggedIn] = createSignal()
    async function fetchLogin(){
        let res = await fetch(`${props.url}/api/users/login`,{credentials:'include'})
        let res1 = await res.json();
        return res1.loggedIn
    }
    fetchLogin().then(result => setLoggedIn(result))

    createEffect(() => {
        if(loggedIn()===false){
            navigate('/login',{replace:true})
        }
    })
    return (
        <><Outlet/></>
    )
}

export default RouteGuard