import React from 'react';
import styles from "./loadingpopup.module.css"
import CardWrapper from "../cardWrapper";
import {Spinner} from "react-bootstrap";

function LoadingPopup({headerTitle="",loadingTitle = "loading...",...props}) {
    return (
        <CardWrapper className={styles.component} {...props}>
            <h3>{headerTitle}</h3>
            <div className={styles.loadingContainer} >
                <Spinner animation={"border"} className={styles.spinner} />
                {loadingTitle}
            </div>
        </CardWrapper>
    );
}

export default LoadingPopup;