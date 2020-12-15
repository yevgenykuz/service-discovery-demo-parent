import React, {useEffect, useState} from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import styles from "./depositSuccessfulScreen.module.css";
import {useUserInfo} from "../../../recoilStates/userAuth";
import {useLocation} from "react-router-dom";
import CardWrapper from "../../components/cardWrapper";

function DepositSuccessfulScreen() {
    const [{username}] = useUserInfo()
    let {search} = useLocation();
    const [amount,setAmount] = useState("1")
    useEffect(()=>{
        const searchParams = new URLSearchParams(search)
        const paramAmount = searchParams.get("amount") || "1";
        setAmount(paramAmount)
    },[]) // eslint-disable-line react-hooks/exhaustive-deps
    return (<ScreenWrapper>
            <CardWrapper className={`capitalize ${styles.card}`}>
                <img src="/img/tick.svg" className={`iconSmall ${styles.icon}`} alt="tick icon"/>
                <h4>{username} deposited {amount}$</h4>
            </CardWrapper>
        </ScreenWrapper>
    );
}

export default DepositSuccessfulScreen;
