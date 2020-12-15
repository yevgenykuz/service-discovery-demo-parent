import React from 'react';
import styles from "./coloredMoney.module.css";

function ColoredMoney({className="",children,amount= 0,...props}) {
    return (
        <h3 className={`${className} ${amount >= 0 ? styles.amount_plus : styles.amount_minus}`} {...props}>{children}</h3>
    );
}

export default ColoredMoney;
