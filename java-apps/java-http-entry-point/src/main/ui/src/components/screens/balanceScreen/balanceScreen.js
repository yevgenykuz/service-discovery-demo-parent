import React, {useEffect} from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import {checkBalance} from "../../../models/API";
import LoadingPopup from "../../components/loadingPopup";
import CardWrapper from "../../components/cardWrapper";
import styles from "./balanceScreen.module.css"
import {useUserInfo} from "../../../recoilStates/userAuth";
import useLogger from "../../../recoilStates/logger";
function BalanceScreen() {

    const [balance, setBalance] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)
    const [{username}] = useUserInfo()
    const logger = useLogger()

    useEffect(()=>{
        logger.logEntryPoint(`check balance for "${username}" initiated`)

    },[])

    React.useEffect(() => {
        checkBalance(username).then(value => {
            setBalance(value);
            setIsLoading(false)
            logger.logSink(`check balance for "${username}" called `)

        })
    }, [])

    return (
        <ScreenWrapper className={`flexCenter`}>
            {isLoading ? <LoadingPopup/> :
                <CardWrapper className={styles.content}>
                    <img src="/img/withdraw.svg" alt="" className={styles.icon}/>

                    <h6>{username}'s current balance is:</h6>

                    <h3 className={`${styles.amount} ${balance>=0?styles.amount_plus:styles.amount_minus}`}>{balance}$</h3>

                </CardWrapper>}
        </ScreenWrapper>
    );


}

export default BalanceScreen;