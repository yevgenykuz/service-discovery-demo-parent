import React from 'react';
import styles from "./balanceScreen.module.css"
import AwaitingAsyncScreen from "../../components/awaitingAsyncScreen/awaitingAsyncScreen";
import CardWrapper from "../../components/cardWrapper";
import ColoredMoney from "../../components/coloredMoney";
import {checkBalance} from "../../../models/API";
import {useUserInfo} from "../../../recoilStates/userAuth";

function BalanceScreen() {

    const [{username}] = useUserInfo()

    return (
        <AwaitingAsyncScreen
            fetchTask={() => checkBalance(username)}
            loadingHeader={`loading ${username}'s balance`}
            loadingTitle={"Processing..."}
        >
            {
                (balance) =>
                    <CardWrapper className={styles.content}>
                        <img src="/img/withdraw.svg" alt="" className={`iconMarginMedium iconMedium`}/>

                        <h6><span className={"capitalize"}>{username}'s</span> current balance is:</h6>
                        <ColoredMoney className={styles.amount} amount={balance}>{balance}$</ColoredMoney>
                    </CardWrapper>
            }

        </AwaitingAsyncScreen>
    );


}

export default BalanceScreen;
