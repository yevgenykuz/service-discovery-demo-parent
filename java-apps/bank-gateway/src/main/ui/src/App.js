import React from "react"
import {Switch, Route, useLocation, useHistory} from "react-router-dom"

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
import NavBarBase from "./components/components/navBarBase";
import {getAllowedRoutesWithoutLogin} from "./constants/routes";


function App() {
    const isLoggedIn = useIsLoggedInState()
    const [, setObj] = useUserInfo()
    let {pathname} = useLocation();
    let history = useHistory();

    const isInLogsScreen = pathname.startsWith(routes.LOGS)



    React.useEffect(() => {
        if (Auth.isLoggedIn())
            Auth.getUserInfo().then(({username}) => setObj.setUserName(username))
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    React.useEffect(()=>{
        if(!isLoggedIn)
            if(!getAllowedRoutesWithoutLogin().includes(pathname))
                return  history.replace(routes.LOGIN)

        if(isLoggedIn && pathname === routes.LOGIN)
            return  history.replace(routes.HOME)

    },[pathname,isLoggedIn])// eslint-disable-line react-hooks/exhaustive-deps




    return (<div className="App">
            {isLoggedIn && !isInLogsScreen && <NavBar/>}
            {pathname.startsWith(routes.LOGS) && <NavBarBase/>}
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

                <Route exact path={routes.DEPOSIT} component={DepositScreen}/>
                <Route exact path={routes.DEPOSIT_PROCESSING} component={DepositProcessingScreen}/>
                <Route exact path={routes.DEPOSIT_SUCCESSFUL} component={DepositSuccessfulScreen}/>
                <Route exact path={routes.CHECK_BALANCE} component={BalanceScreen}/>
                <Route exact path={routes.LOGIN} component={LoginScreen} />
                <Route path={routes.HOME} component={HomeScreen}/>

            </Switch>
        </div>
    );
}

export default App;
