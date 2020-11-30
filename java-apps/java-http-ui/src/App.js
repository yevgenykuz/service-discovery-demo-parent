import React from "react"
import './App.css';
import {Switch, Route} from "react-router-dom"
import * as routes from "./constants/routes"
import LoginScreen from "./components/screens/loginScreen";
import HomeScreen from "./components/screens/homeScreen";
import DepositScreen from "./components/screens/depositScreen";
import BalanceScreen from "./components/screens/balanceScreen";
import useIsLoggedInState from "./recoilStates/userAuth";
import * as Auth from "./models/auth"

import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from "./components/navBar";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useIsLoggedInState()

    React.useEffect(() => {
        setIsLoggedIn(Auth.isLoggedIn())
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
                <Route exact path={routes.DEPOSIT} component={DepositScreen}/>
                <Route exact path={routes.CHECK_BALANCE} component={BalanceScreen}/>
            </Switch>
        </div>
    );
}

export default App;
