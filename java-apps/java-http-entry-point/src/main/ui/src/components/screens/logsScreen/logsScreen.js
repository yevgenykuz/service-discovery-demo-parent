import React, {useEffect} from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import {Button, ListGroup} from "react-bootstrap";
import dayjs from "dayjs"
import styles from "./logsScreen.module.css"
import useLogger from "../../../recoilStates/logger";
import {LOGS_UPDATE_DURATION} from "../../../constants/delayDurations";

function LogsScreen({logsType = "all", title}) {
    const logger = useLogger()
    const currentLogsFunctions = logger[logsType]

    useEffect(() => {
        const intervalId = setInterval(logger.updateFromLocalStorage, LOGS_UPDATE_DURATION)
        return () => clearInterval(intervalId)
    })

    return (
        <ScreenWrapper className={styles.component} >
            <header className={styles.header}>
                {title && <h4>{title}</h4>}
                <Button variant={"info"} onClick={currentLogsFunctions?.clear}>Clear</Button>
            </header>

            {
                currentLogsFunctions?.logs && <ListGroup className={styles.list}>
                    {!currentLogsFunctions.logs.length &&<main className={styles.notFound}><h4>no logs were found</h4></main>}
                    {currentLogsFunctions.logs.map(data => (
                        <ListGroup.Item key={data.date} action
                                        className={styles.logEntry}>
                            <span className={styles.dateSpan}>{dayjs(data?.date).format("DD/MM/YYYY HH:mm:ss")}</span>
                            <h5>-</h5>

                            {logsType === "all" && <>
                                <span className={`${styles.logTypeSpan} ${styles[data?.type]}`}>{data?.type}</span>
                                <h5>-</h5>
                            </>}

                            <span className={styles.messageSpan}>{data?.message}</span>

                        </ListGroup.Item>
                    ))}
                </ListGroup>
            }


        </ScreenWrapper>
    );
}

export default LogsScreen;