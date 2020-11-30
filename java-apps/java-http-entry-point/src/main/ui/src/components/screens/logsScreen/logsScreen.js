import React from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import {ListGroup, Modal} from "react-bootstrap";
import dayjs from "dayjs"
import styles from "./logsScreen.module.css"

function LogsScreen({logs,title="",clearLogs}) {
    return (
        <ScreenWrapper className={styles.component}>
            {title && <h4 className={styles.title}>{title}</h4>}

            <ListGroup className={styles.list} >
                {logs && logs.map(data=><ListGroup.Item key={data.date} action className={styles.logEntry}>
                    <span className={styles.dateSpan}>{dayjs(data?.date).format("DD/MM/YYYY HH:mm:ss")}</span>
                    <h5>-</h5>
                    <span className={styles.messageSpan}>{data?.message}</span>

                </ListGroup.Item>)}
            </ListGroup>

        </ScreenWrapper>
    );
}

export default LogsScreen;