import React from 'react';
import styles from "./loadingpopup.module.css"
import CardWrapper from "../cardWrapper";
import {Spinner} from "react-bootstrap";

function LoadingPopup({title="loading...",...props}) {
    return (
        <CardWrapper className={styles.component} {...props}>
            <Spinner animation={"border"} className={styles.spinner} />
            {title}
        </CardWrapper>
    );
}

export default LoadingPopup;
