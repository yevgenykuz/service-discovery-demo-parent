import React from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import {Button, ListGroup} from "react-bootstrap";
import dayjs from "dayjs"
import styles from "./logsScreen.module.css"
import {useLogs} from "../../../recoilStates/logger";
import {getLogTypeDisplayName, loggerInstance} from "../../../models/logger";

function LogsScreen({logsType = "all"}) {
    const [logs] = useLogs()
    const currentLogsFunctions = logs[logsType]


    return (
        <ScreenWrapper className={styles.component}>
            <header className={`${styles.header} capitalize`}>
                 <h4>{getLogTypeDisplayName(logsType)} Transactions</h4>
                <Button variant={"info"} onClick={() => loggerInstance.clearType(logsType)}>Clear</Button>
            </header>

            {
                currentLogsFunctions && <ListGroup className={styles.list}>
                    {!currentLogsFunctions.length &&
                    <main className={styles.notFound}><h4>no logs were found</h4></main>}
                    {[...currentLogsFunctions].sort((a, b) => a.date >= b.date ? -1 : 1).map((data, index) => (
                        <ListGroup.Item key={index} action
                                        className={styles.logEntry}>
                            <span className={`${styles.dateSpan} ${logsType !== "all"?styles[data?.type]:""}`}>{dayjs(data?.date).format("DD/MM/YYYY HH:mm:ss")}</span>
                            <h5>-</h5>

                            {logsType === "all" && <>
                                <span className={`${styles.logTypeSpan} ${styles[data?.type]}`}>{getLogTypeDisplayName(data?.type)}</span>
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
