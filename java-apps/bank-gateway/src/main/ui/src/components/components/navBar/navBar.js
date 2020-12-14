import React from 'react';
import {Link, useHistory,useLocation} from "react-router-dom";
import {CHECK_BALANCE, DEPOSIT} from "../../../constants/routes";
import {useUserInfo} from "../../../recoilStates/userAuth";
import * as Auth from "../../../models/auth";
import * as routes from "../../../constants/routes";
import styles from "../navBarBase/navBarBase.module.css"
import {Nav} from "react-bootstrap";
import useLogger from "../../../recoilStates/logger";
import NavBarBase from "../navBarBase";
import {getSelectedClassname} from "../navBarBase/navBarUtil";

function NavBar() {

    const history = useHistory()
    let {pathname} = useLocation();
    const [{username}, setObj] = useUserInfo()
    const logger = useLogger()

    function handleLogout(){
        Auth.logout()
            .then(()=>{
                setObj.logout()
                history.push(routes.LOGIN)
                logger.entryPoint.log(`"${username}" has logged out`)
            })
    }


    return (
      <NavBarBase>

            <Nav.Link  as="section">
                <Link to={DEPOSIT}><span className={`${styles.button} ${getSelectedClassname(pathname,DEPOSIT)}`}>Deposit</span></Link>
            </Nav.Link>

            <Nav.Link  as="section">
                <Link to={CHECK_BALANCE} ><span className={`${styles.button} ${getSelectedClassname(pathname,CHECK_BALANCE)}`}>Check Balance</span></Link>
            </Nav.Link>

            <Nav.Link as={"section"}  onClick={handleLogout}>
               <span className={styles.button}>Logout</span>
            </Nav.Link>

        </NavBarBase>
    );
}

export default NavBar;
