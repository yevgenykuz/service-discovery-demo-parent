import React from 'react';
import styles from "./screenWrapper.module.css"

function ScreenWrapper({className = "",children,containerClassName,...props }) {
    return (
        <div className={`${styles.component} ${containerClassName}`} {...props}>
            <div className={styles.background} style={{backgroundImage:`url("/img/bitcoinBackground/image.jpg")`}} />
            <div className={`${styles.content} ${className}`}>
            {children}
            </div>

        </div>

    );
}

export default ScreenWrapper;