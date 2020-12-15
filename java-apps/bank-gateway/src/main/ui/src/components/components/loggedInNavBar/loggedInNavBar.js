import React from 'react';
import {Link, useHistory, useLocation} from "react-router-dom";
import {getLoggedInNavBarOptions} from "../../../constants/routes";
import {useUserInfo} from "../../../recoilStates/userAuth";
import * as Auth from "../../../models/auth";
import * as routes from "../../../constants/routes";
import styles from "../navBarBase/navBarBase.module.css"
import {Nav} from "react-bootstrap";
import NavBarBase from "../navBarBase";
import {getSelectedClassname} from "../navBarBase/navBarUtil";

function LoggedInNavBar() {

    const history = useHistory()
    let {pathname} = useLocation();
    const [, setObj] = useUserInfo()

    function handleLogout() {
        Auth.logout()
            .then(() => {
                setObj.logout()
                history.push(routes.LOGIN)
            })
    }


    return (
        <NavBarBase>
            {Object.entries(getLoggedInNavBarOptions()).map(([route, routeName]) =>
                <Nav.Link as="section" key={route}>
                    <Link to={route}><span
                        className={`${styles.button} ${getSelectedClassname(pathname, route)}`}>{routeName}</span></Link>
                </Nav.Link>
            )}

            <Nav.Link as={"section"} onClick={handleLogout}>
                <span className={styles.button}>Logout</span>
            </Nav.Link>


        </NavBarBase>
    );
}

export default LoggedInNavBar;
