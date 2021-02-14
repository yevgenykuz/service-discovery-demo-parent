import React, {useState} from 'react';
import {Button, Toast} from "react-bootstrap";
import styles from "./logsMenu.module.css"
import {Link} from "react-router-dom";
import {LOGS, LOGS_ENTRY_POINT, LOGS_PROPAGATOR, LOGS_SINK, STRESS_TEST, HOME} from "../../../constants/routes";
import {getLogTypeDisplayName, logTypes} from "../../../models/logger";
import {useHiddenMode} from "../../../recoilStates/hiddenModeEnabled";
import {SWAGGER_ROUTE} from "../../../models/API";

function LogsMenu(props) {
    const [showContent, setShowContent] = useState(true)
    const hiddenModeEnabled = useHiddenMode()
    function togglePopup() {
        setShowContent(!showContent)
    }

    return (<div className={styles.component}>
            {!showContent && <Button variant={"secondary"} onClick={togglePopup} >
                <strong className="mr-auto">Transactions</strong>
            </Button>}
            <Toast show={showContent} onClose={togglePopup} animation={false}>
                <Toast.Header>
                    <strong className="mr-auto">Transactions</strong>
                </Toast.Header>
                <Toast.Body className={styles.buttonsContainer}>
                    {hiddenModeEnabled && <><Link to={STRESS_TEST}>
                        <Button variant={"outline-danger"}>Stress Test</Button></Link>
                        <a href={SWAGGER_ROUTE}><Button variant={"outline-warning"}>Swagger</Button></a>
                    </>}
                    <Link to={HOME}><Button variant={"outline-info"}>Home</Button></Link>
                    <Link to={LOGS}><Button variant={"info"}>All</Button></Link>
                    <Link to={LOGS_ENTRY_POINT}><Button variant={"info"} className={"capitalize"}>{getLogTypeDisplayName(logTypes.entryPoint)}</Button></Link>
                    <Link to={LOGS_PROPAGATOR}><Button variant={"info"} className={"capitalize"}>{getLogTypeDisplayName(logTypes.propagator)}</Button></Link>
                    <Link to={LOGS_SINK}><Button variant={"info"} className={"capitalize"}>{getLogTypeDisplayName(logTypes.sink)}</Button></Link>
                </Toast.Body>
            </Toast>
        </div>
    );
}

export default LogsMenu;
