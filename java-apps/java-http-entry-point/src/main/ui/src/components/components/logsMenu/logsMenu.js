import React, {useState} from 'react';
import {Button, Toast} from "react-bootstrap";
import styles from "./logsMenu.module.css"
import {Link} from "react-router-dom";
import {LOGS, LOGS_ENTRY_POINT, LOGS_PROPAGATOR, LOGS_SINK} from "../../../constants/routes";

function LogsMenu(props) {
    const [showContent, setShowContent] = useState(true)

    function togglePopup() {
        setShowContent(!showContent)
    }

    return (<div className={styles.component}>
            {!showContent && <Button variant={"secondary"} onClick={togglePopup} >
                <strong className="mr-auto">Transaction Logs</strong>
            </Button>}
            <Toast show={showContent} onClose={togglePopup} animation={false}>
                <Toast.Header>
                    <strong className="mr-auto">Transaction Logs</strong>
                </Toast.Header>
                <Toast.Body className={styles.buttonsContainer}>
                    <Link to={LOGS}><Button variant={"info"}>All</Button></Link>
                    <Link to={LOGS_ENTRY_POINT}><Button variant={"info"}>Entry point</Button></Link>
                    <Link to={LOGS_PROPAGATOR}><Button variant={"info"}>Propagator</Button></Link>
                    <Link to={LOGS_SINK}><Button variant={"info"}>Sink</Button></Link>
                </Toast.Body>
            </Toast>
        </div>
    );
}

export default LogsMenu;
