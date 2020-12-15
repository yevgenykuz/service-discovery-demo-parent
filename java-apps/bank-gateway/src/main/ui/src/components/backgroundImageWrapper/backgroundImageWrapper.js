import React from 'react';
import styles from "./backgroundImageWrapper.module.css"

function BackgroundImageWrapper({className = "",contentClassName="",children,contentProps,...props}) {
    return (
        <div className={`${styles.component} ${className}`} {...props}>
            <div className={styles.backgroundImg} style={{backgroundImage:`url("/img/bitcoinBackground/image.jpg")`}} />
            <div className={`${styles.content} ${contentClassName}`} {...contentProps}>
                {children}
            </div>

        </div>

    );
}

export default BackgroundImageWrapper;
