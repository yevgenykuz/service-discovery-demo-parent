import React from 'react';
import styles from "./loadingpopup.module.css"
import CardWrapper from "../cardWrapper";
import {Spinner} from "react-bootstrap";

function LoadingPopup(props) {
    return (
        <CardWrapper className={styles.component}>
            <Spinner animation={"border"} className={styles.spiner} />
            loading...
        </CardWrapper>
    );
}

export default LoadingPopup;
