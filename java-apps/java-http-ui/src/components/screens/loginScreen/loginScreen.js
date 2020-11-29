import React,{useState} from 'react';
import {login} from "../../../models/auth";
import useIsLoggedInState from "../../../recoilStates/userAuth";
import ScreenWrapper from "../../components";

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
        <ScreenWrapper>
            <form onSubmit={handleSubmit}>
                <input type="text" value={userName} onChange={(e)=>setUserName(e.target.value)}/>
                <input type="password" value={pass} onChange={e=>setPass((e.target.value))}/>
                <input type="submit"/>
                <span>{error}</span>
            </form>
        </ScreenWrapper>
    );
}

export default LoginScreen;