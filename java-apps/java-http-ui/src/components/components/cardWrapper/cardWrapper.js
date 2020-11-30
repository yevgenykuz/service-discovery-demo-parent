import React from 'react';
import styles from "./cardWrapper.module.css"

function CardWrapper({className="",...props}) {
    return (
        <div className={`${styles.component} ${className}`} {...props}/>
    );
}

export default CardWrapper;
