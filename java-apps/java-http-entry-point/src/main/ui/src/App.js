import React from "react"
import './App.css';
import {Switch, Route} from "react-router-dom"
import * as routes from "./constants/routes"
import LoginScreen from "./components/screens/loginScreen";
import HomeScreen from "./components/screens/homeScreen";
import DepositScreen from "./components/screens/depositScreen";
import BalanceScreen from "./components/screens/balanceScreen";
import {useIsLoggedInState, useUserInfo} from "./recoilStates/userAuth";
import * as Auth from "./models/auth"

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/components/navBar";


function App() {
    const isLoggedIn = useIsLoggedInState()
    const [_,setObj] = useUserInfo()

    React.useEffect(() => {
        if(Auth.isLoggedIn())
            Auth.getUserInfo().then(({username})=>setObj.setUserName(username))
    }, [])


    if (!isLoggedIn)
        return <Switch>
            <Route path={routes.LOGIN}>
                <LoginScreen/>
            </Route>
        </Switch>


    return (<div className="App">
            <NavBar/>
            <Switch>
                <Route exact path={routes.HOME} component={HomeScreen}/>
                <Route path={routes.DEPOSIT} component={DepositScreen}/>
                <Route exact path={routes.CHECK_BALANCE} component={BalanceScreen}/>
                <Route exact path={routes.LOGS_SINK} >

                </Route>
            </Switch>
        </div>
    );
}

export default App;
