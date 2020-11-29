import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {CHECK_BALANCE, DEPOSIT} from "../../../constants/routes";
import * as Auth from "../../../models/auth";
import * as routes from "../../../constants/routes";
import useIsLoggedInState from "../../../recoilStates/userAuth";
import styles from "./homeScreen.module.css"
import ScreenWrapper from "../../components";

function HomeScreen(props) {

    const history = useHistory()
    const [, setIsLoggedIn] = useIsLoggedInState()
    function handleLogout(){
        Auth.logout()
            .then(()=>{
                setIsLoggedIn(Auth.isLoggedIn())
                history.push(routes.LOGIN)
            })
    }

    return (
        <ScreenWrapper className={styles.component}>
            <Link to={DEPOSIT}>
                <button>deposit</button>
            </Link>
            <Link to={CHECK_BALANCE}>
                <button>check balance</button>
            </Link>
            <button onClick={handleLogout}>logout</button>

        </ScreenWrapper>
    );
}

export default HomeScreen;