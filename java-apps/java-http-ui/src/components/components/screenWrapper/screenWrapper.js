import React from 'react';
import styles from "./screenWrapper.module.css"

function ScreenWrapper({className = "",children,...props}) {
    return (
        <div className={styles.component} {...props}>
            <div className={styles.background} style={{backgroundImage:`url("/img/bitcoinBackground/image.jpg")`}} />
            <div className={`${styles.content} ${className}`}>
            {children}
            </div>

        </div>

    );
}

export default ScreenWrapper;