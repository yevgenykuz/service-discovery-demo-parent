import React from 'react';
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

    React.useEffect(() => {
        checkBalance(username).then(value => {
            setBalance(value);
            setIsLoading(false)
        })
    }, [])

    return (
        <ScreenWrapper className={`flexCenter`}>
            {isLoading ? <LoadingPopup/> :
                <CardWrapper className={styles.content}>
                    <img src="/img/withdraw.svg" alt="" className={styles.icon}/>

                    <h6>{username}'s current balance is:</h6>
                    <p>
                    {/*add up/down arrow icon */}
                    <h3 className={`${styles.amount} ${balance>=0?styles.amount_plus:styles.amount_minus}`}>{balance}$</h3>
                    </p>
                </CardWrapper>}
        </ScreenWrapper>
    );


}

export default BalanceScreen;