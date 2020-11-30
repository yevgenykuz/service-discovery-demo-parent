import React from 'react';
import styles from "./screenWrapper.module.css"

function ScreenWrapper({className = "",...props}) {
    return (
        <div className={`${styles.component} ${className}`} {...props}/>
    );
}

export default ScreenWrapper;