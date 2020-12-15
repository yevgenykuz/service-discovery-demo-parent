import React from 'react';
import {Nav, Navbar} from "react-bootstrap";
import styles from "./navBarBase.module.css";
import {Link, useLocation} from "react-router-dom";
import {getBaseNavBarOptions, HOME} from "../../../constants/routes";
import {getSelectedClassname} from "./navBarUtil";

function NavBarBase({children}) {
    let {pathname} = useLocation();

    return (
            <Navbar className={styles.component} as={"nav"} bg={"dark"} variant={"dark"}>
                <Navbar.Brand > <Link to={HOME}><span className={styles.logoText}>Bank</span></Link></Navbar.Brand>

                {Object.entries(getBaseNavBarOptions()).map(([route, routeName]) =>
                    <Nav.Link as="section" key={route}>
                        <Link to={route}><span
                            className={`${styles.button} ${getSelectedClassname(pathname, route)}`}>{routeName}</span></Link>
                    </Nav.Link>
                )}
                {children}
            </Navbar>

    );
}

export default NavBarBase;
