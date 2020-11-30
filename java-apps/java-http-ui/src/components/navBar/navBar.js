import React from 'react';
import {Link, useHistory} from "react-router-dom";
import {CHECK_BALANCE, DEPOSIT} from "../../constants/routes";
import useIsLoggedInState from "../../recoilStates/userAuth";
import * as Auth from "../../models/auth";
import * as routes from "../../constants/routes";
import styles from "./navBar.module.css"
import {Nav, Navbar} from "react-bootstrap";

function NavBar() {

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
        <Navbar className={styles.component} bg={"dark"} variant={"dark"}>
           <Navbar.Brand>Checkmarx Bank</Navbar.Brand>
            <Nav.Link>
                <Link to={DEPOSIT}>Deposit</Link>
            </Nav.Link>

            <Nav.Link>
                <Link to={CHECK_BALANCE}>Check Balance</Link>
            </Nav.Link>

            <Nav.Link  onClick={handleLogout}>
                Logout
            </Nav.Link>

        </Navbar>
    );
}

export default NavBar;