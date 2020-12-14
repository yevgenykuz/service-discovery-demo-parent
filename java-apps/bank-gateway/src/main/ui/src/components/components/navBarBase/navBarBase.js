import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import styles from "./navBarBase.module.css";
import {Link, useLocation} from "react-router-dom";
import {HOME} from "../../../constants/routes";
import {getSelectedClassname} from "./navBarUtil";

function NavBarBase({children}) {
    let {pathname} = useLocation();

    return (
            <Navbar className={styles.component} as={"nav"} bg={"dark"} variant={"dark"}>
                <Navbar.Brand ><span className={styles.logoText}>Bank</span></Navbar.Brand>

                <Nav.Link  as="section">
                    <Link to={HOME}><span className={`${styles.button} ${getSelectedClassname(pathname,HOME)}`}>Home</span></Link>
                </Nav.Link>
                {children}
            </Navbar>

    );
}

export default NavBarBase;
