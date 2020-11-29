import React,{useState} from 'react';
import {login} from "../../../models/auth";
import useIsLoggedInState from "../../../recoilStates/userAuth";

function LoginScreen(props) {
    const [userName,setUserName] = useState("")
    const [pass,setPass] = useState("")
    const [error,setErrorMessage] = useState("")
    const [_,setIsLoggedIn] = useIsLoggedInState()

    function handleSubmit(e){
        e.preventDefault()
        login(userName,pass).then(()=>setIsLoggedIn(true)).catch(e=>setErrorMessage(e.message));
    }


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                <input type="password" value={pass} onChange={e=>setPass((e.target.value))}/>
                <input type="submit"/>
                <span>{error}</span>
            </form>
        </div>
    );
}

export default LoginScreen;