import React from "react"
import {Switch, Route} from "react-router-dom"

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginScreen from "./components/screens/loginScreen";
import HomeScreen from "./components/screens/homeScreen";
import DepositScreen from "./components/screens/depositScreen";
import BalanceScreen from "./components/screens/balanceScreen";
import LogsScreen from "./components/screens/logsScreen";
import DepositProcessingScreen from "./components/screens/depositProccessingScreen";
import DepositSuccessfulScreen from "./components/screens/depositSuccessfulScreen";
import NavBar from "./components/components/navBar";

import {useIsLoggedInState, useUserInfo} from "./recoilStates/userAuth";
import * as Auth from "./models/auth"
import * as routes from "./constants/routes"
import {logTypes} from "./recoilStates/logger";
import LogsMenu from "./components/components/logsMenu";



function App() {
    const isLoggedIn = useIsLoggedInState()
    const [, setObj] = useUserInfo()

    React.useEffect(() => {
        if (Auth.isLoggedIn())
            Auth.getUserInfo().then(({username}) => setObj.setUserName(username))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (<div className="App">
            {isLoggedIn && <NavBar/>}
            <LogsMenu/>
            <Switch>
                <Route exact path={routes.LOGS_SINK}>
                    <LogsScreen title={"Sink Logs"} logsType={logTypes.sink}/>
                </Route>
                <Route exact path={routes.LOGS_ENTRY_POINT}>
                    <LogsScreen title={"Entry Point Logs"} logsType={logTypes.entryPoint}/>
                </Route>
                <Route exact path={routes.LOGS_PROPAGATOR}>
                    <LogsScreen title={"Propagator Logs"} logsType={logTypes.propagator}/>
                </Route>
                <Route exact path={routes.LOGS}>
                    <LogsScreen title={"Transactions"}/>
                </Route>
                {isLoggedIn ?
                    <>
                        <Route exact path={routes.HOME} component={HomeScreen}/>
                        <Route exact path={routes.DEPOSIT} component={DepositScreen}/>
                        <Route exact path={routes.DEPOSIT_PROCESSING} component={DepositProcessingScreen}/>
                        <Route exact path={routes.DEPOSIT_SUCCESSFUL} component={DepositSuccessfulScreen}/>
                        <Route exact path={routes.CHECK_BALANCE} component={BalanceScreen}/>
                    </>
                    : <>
                        <Route path={routes.LOGIN} component={LoginScreen}/>
                    </>
                }
            </Switch>
        </div>
    );
}

export default App;
