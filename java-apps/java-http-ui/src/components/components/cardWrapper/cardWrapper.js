import React from 'react';
import styles from "./cardWrapper.module.css"

function CardWrapper({classname="",...props}) {
    return (
        <div className={`${styles.component} ${classname}`} {...props}/>
    );
}

export default CardWrapper;
