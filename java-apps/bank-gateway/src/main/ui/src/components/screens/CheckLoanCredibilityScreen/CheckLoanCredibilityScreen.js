import React from 'react';

import styles from "./CheckLoanCredibilityScreen.module.css";
import CardWrapper from "../../components/cardWrapper";
import AwaitingAsyncScreen from "../../components/awaitingAsyncScreen/awaitingAsyncScreen";
import {checkLoanCredibility} from "../../../models/API";
import {useUserInfo} from "../../../recoilStates/userAuth";

function CheckLoanCredibilityScreen() {
    const [{username}] = useUserInfo()

    return <AwaitingAsyncScreen
        fetchTask={() => checkLoanCredibility(username)}
        loadingHeader={`checking ${username}'s loan credibility`}
        loadingTitle={"Processing..."}
        loadingComponentProps={{className:styles.loadingContainer}}
    >
        {
            (response) =>
                <CardWrapper className={styles.content}>
                    <img src="/img/tick.svg" alt="" className={`iconMarginMedium iconMedium`}/>
                    <h4 className="capitalize">{response}</h4>
                </CardWrapper>
        }

    </AwaitingAsyncScreen>

}

export default CheckLoanCredibilityScreen;
