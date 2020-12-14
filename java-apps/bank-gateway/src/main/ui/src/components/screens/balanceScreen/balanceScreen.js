import React, {useEffect, useRef} from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import {checkBalance} from "../../../models/API";
import LoadingPopup from "../../components/loadingPopup";
import CardWrapper from "../../components/cardWrapper";
import styles from "./balanceScreen.module.css"
import {useUserInfo} from "../../../recoilStates/userAuth";
function BalanceScreen() {

    const [balance, setBalance] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)
    const [{username}] = useUserInfo()
    const userLeftPageRef = useRef(false)


    useEffect(() => {

        checkBalance(username).then(value => {
            if(userLeftPageRef.current)
                return;
            setBalance(value);
            setIsLoading(false)
        })

        return  ()=> userLeftPageRef.current=true

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <ScreenWrapper className={`flexCenter`}>
            {isLoading ? <LoadingPopup className={styles.loadingContainer} headerTitle={`loading ${username}'s balance`}
                                       loadingTitle={"Processing..."}/> :
                <CardWrapper className={styles.content}>
                    <img src="/img/withdraw.svg" alt="" className={`iconMarginMedium iconMedium`}/>

                    <h6><span className={styles.userName}>{username}'s</span> current balance is:</h6>

                    <h3 className={`${styles.amount} ${balance >= 0 ? styles.amount_plus : styles.amount_minus}`}>{balance}$</h3>

                </CardWrapper>}
        </ScreenWrapper>
    );


}

export default BalanceScreen;
