import React from 'react';
import styles from "./screenWrapper.module.css"

function ScreenWrapper({className = "",children,...props }) {
    return (
        <div className={`${styles.component} ${className}`} {...props}>
            {children}
        </div>

    );
}

export default ScreenWrapper;
