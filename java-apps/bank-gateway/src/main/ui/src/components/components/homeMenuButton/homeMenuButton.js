import React from 'react';
import styles from "./homeMenuButton.module.css"

function HomeMenuButton({size = "150px", color = "white", textColor = "black", iconSrc = "", label = "", onClick, className = "", style, ...props}) {

    return (<div style={{
            ...style,
            width: size.toString(),
            height: size.toString(),
            backgroundColor: color,
            color: textColor
        }}
                 className={`capitalize ${styles.component} ${className}`} {...props} onClick={onClick}>
            {iconSrc && <img src={iconSrc} alt={label} style={{
                ...style,
                width: `calc( ${size.toString()} / 3 )`,
                height: `calc( ${size.toString()} / 3 )`
            }}/>}
            {label && <span>{label}</span>}
        </div>
    );
}

export default HomeMenuButton;
