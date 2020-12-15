import React, {useState, useEffect} from "react"
import {Switch, Route, useLocation, useHistory} from "react-router-dom"

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import LoginScreen from "./components/screens/loginScreen";
import HomeScreen from "./components/screens/homeScreen";
import DepositScreen from "./components/screens/depositScreen";
import BalanceScreen from "./components/screens/balanceScreen";
import LogsScreen from "./components/screens/logsScreen";
import DepositProcessingScreen from "./components/screens/depositProcessingScreen";
import DepositSuccessfulScreen from "./components/screens/depositSuccessfulScreen";
import ConvertCurrencyScreen from "./components/screens/convertCurrencyScreen";
import ConvertCurrencyProcessingScreen from "./components/screens/convertCurrencyProcessingScreen";
import ConvertCurrencyResultScreen from "./components/screens/convertCurrencyResultScreen";
import LoggedInNavBar from "./components/components/loggedInNavBar";

import {useIsLoggedInState, useUserInfo} from "./recoilStates/userAuth";
import * as Auth from "./models/auth"
import * as routes from "./constants/routes"
import {logTypes} from "./models/logger";
import LogsMenu from "./components/components/logsMenu";
import NavBarBase from "./components/components/navBarBase";
import {getAllowedRoutesWithoutLogin} from "./constants/routes";
import BackgroundImageWrapper from "./components/backgroundImageWrapper";


function App() {
    const [isLoaded,setIsLoaded] = useState(false)
    const isLoggedIn = useIsLoggedInState()
    const [, setObj] = useUserInfo()


    let {pathname} = useLocation();
    let history = useHistory();
    const isInLogsScreen = pathname.startsWith(routes.LOGS)



   useEffect(() => {
        if (Auth.isLoggedIn())
            Auth.getUserInfo().then(({username}) => {
                setObj.setUserName(username)
                setIsLoaded(true)
            })
    }, []) // eslint-disable-line react-hooks/exhaustive-deps
    useEffect(()=>{
        if(!isLoaded)
            return ;

        if(!isLoggedIn)
            if(!getAllowedRoutesWithoutLogin().includes(pathname))
                return  history.replace(routes.LOGIN)

        if(isLoggedIn && pathname === routes.LOGIN)
            return  history.replace(routes.HOME)

    },[pathname,isLoggedIn,isLoaded])// eslint-disable-line react-hooks/exhaustive-deps




    return (<BackgroundImageWrapper>
            {isLoggedIn && !isInLogsScreen && <LoggedInNavBar/>}
            {pathname.startsWith(routes.LOGS) && <NavBarBase/>}
            <LogsMenu/>
            <Switch>
                <Route exact path={routes.LOGS_SINK}>
                    <LogsScreen logsType={logTypes.sink}/>
                </Route>
                <Route exact path={routes.LOGS_ENTRY_POINT}>
                    <LogsScreen logsType={logTypes.entryPoint}/>
                </Route>
                <Route exact path={routes.LOGS_PROPAGATOR}>
                    <LogsScreen logsType={logTypes.propagator}/>
                </Route>
                <Route exact path={routes.LOGS}>
                    <LogsScreen title={"Transactions"}/>
                </Route>

                <Route exact path={routes.CONVERT_CURRENCY} component={ConvertCurrencyScreen}/>
                <Route exact path={routes.CONVERT_CURRENCY_PROCESSING} component={ConvertCurrencyProcessingScreen}/>
                <Route exact path={routes.CONVERT_CURRENCY_RESULT} component={ConvertCurrencyResultScreen}/>
                <Route exact path={routes.DEPOSIT} component={DepositScreen}/>
                <Route exact path={routes.DEPOSIT_PROCESSING} component={DepositProcessingScreen}/>
                <Route exact path={routes.DEPOSIT_SUCCESSFUL} component={DepositSuccessfulScreen}/>
                <Route exact path={routes.CHECK_BALANCE} component={BalanceScreen}/>
                <Route exact path={routes.LOGIN} component={LoginScreen} />
                <Route path={routes.HOME} component={HomeScreen}/>

            </Switch>
        </BackgroundImageWrapper>
    );
}

export default App;
