import React from 'react';
import styles from "./homeMenuButton.module.css"

function HomeMenuButton({size = "200px", iconSrc = "", label = "", onClick, className = "", style, ...props}) {

    return (<div style={{...style, width: size.toString(), height: size.toString()}}
                 className={`${styles.component} ${className}`} {...props} onClick={onClick}>
            {iconSrc && <img src={iconSrc} alt={label}/>}
            <span>{label}</span>
        </div>
    );
}

export default HomeMenuButton;