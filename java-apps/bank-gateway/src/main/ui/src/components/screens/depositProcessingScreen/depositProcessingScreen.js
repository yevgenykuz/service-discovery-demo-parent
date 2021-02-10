import React, {useEffect, useState} from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import LoadingPopup from "../../components/loadingPopup";
import {useUserInfo} from "../../../recoilStates/userAuth";
import {useHistory, useLocation} from "react-router-dom";
import {depositAmount} from "../../../models/API";
import {DEPOSIT_SUCCESSFUL} from "../../../constants/routes";

function DepositProcessingScreen() {
    const [{username}] = useUserInfo()
    let {search} = useLocation();
    const history = useHistory()

    const [amount, setAmount] = useState("1")
    useEffect(() => {
        const searchParams = new URLSearchParams(search)
        const paramAmount = searchParams.get("amount") || "1";
        const flow = searchParams.get("flow")?.toLowerCase() === "true"

        setAmount(paramAmount)

        if (!flow)
            return;

        depositAmount(username, paramAmount).then(() => {
            history.push(`${DEPOSIT_SUCCESSFUL}?amount=${paramAmount || 1}`)
        })


    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <ScreenWrapper>
            <LoadingPopup headerTitle={`depositing ${amount}$ to ${username}'s account`} loadingTitle={"Processing..."} />
        </ScreenWrapper>
    );
}

export default DepositProcessingScreen;
