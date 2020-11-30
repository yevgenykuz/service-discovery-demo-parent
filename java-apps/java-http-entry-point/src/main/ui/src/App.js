import React from "react"
import {Switch, Route} from "react-router-dom"

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginScreen from "./components/screens/loginScreen";
import HomeScreen from "./components/screens/homeScreen";
import DepositScreen from "./components/screens/depositScreen";
import BalanceScreen from "./components/screens/balanceScreen";
import LogsScreen from "./components/screens/logsScreen";
import NavBar from "./components/components/navBar";

import {useIsLoggedInState, useUserInfo} from "./recoilStates/userAuth";
import * as Auth from "./models/auth"
import * as routes from "./constants/routes"
import useLogger from "./recoilStates/logger";




function App() {
    const isLoggedIn = useIsLoggedInState()
    const [_,setObj] = useUserInfo()
    const logger = useLogger()

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
                    <LogsScreen title={"Sink Logs"} logs={logger.getSinkLogs()}/>
                </Route>
                <Route exact path={routes.LOGS_ENTRY_POINT} >
                    <LogsScreen title={"Entry Point Logs"} logs={logger.getEntryPointLogs()}/>
                </Route>
                <Route exact path={routes.LOGS_PROPAGATOR} >
                    <LogsScreen title={"Propagator Logs"} logs={logger.getPropagatorLogs()}/>
                </Route>

            </Switch>
        </div>
    );
}

export default App;
