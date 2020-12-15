import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import ScreenWrapper from "../../components/screenWrapper";
import CardWrapper from "../../components/cardWrapper";
import styles from "./convertCurrencyResultScreen.module.css"
import ColoredMoney from "../../components/coloredMoney";

function ConvertCurrencyResultScreen() {

    let {search} = useLocation();
    const [data,setData] = useState({})

    useEffect(()=>{
        const searchParams = new URLSearchParams(search)
        const amount = searchParams.get("amount")
        const target = searchParams.get("target")
        const source = searchParams.get("source")
        const result = Number(searchParams.get("result") || "0")
        setData({amount,target,source,result})

    },[])

    return (<ScreenWrapper>
            <CardWrapper className={styles.card}>
                <div className={`flexCenter ${styles.iconsContainer} iconMarginMedium`}>
                    <img src="/img/exchange.svg" className={`iconMedium ${styles.icon}`} alt="grayscale exchange icon"/>
                    <img src="/img/exchange-color.svg" className={`iconMedium ${styles.iconColor}`} alt=" colored exchange icon"/>
                </div>
                <h4>{data.amount} {data.source} Is Approximately</h4>
                <ColoredMoney amount={data.target}>{data.result} {data.target}</ColoredMoney>
            </CardWrapper>
        </ScreenWrapper>
    );
}

export default ConvertCurrencyResultScreen;
