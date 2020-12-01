import React, {useEffect, useState} from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import LoadingPopup from "../../components/loadingPopup";
import {useUserInfo} from "../../../recoilStates/userAuth";
import {useHistory, useLocation} from "react-router-dom";
import {depositAmount} from "../../../models/API";
import {DEPOSIT_SUCCESSFUL} from "../../../constants/routes";
import useLogger from "../../../recoilStates/logger";

function DepositProcessingScreen() {
    const [{username}] = useUserInfo()
    let {search} = useLocation();
    const history = useHistory()
    const logger = useLogger()

    const [amount,setAmount] = useState("1")
    useEffect(()=>{
        const searchParams = new URLSearchParams(search)
        const paramAmount = searchParams.get("amount") || "1";
        setAmount(paramAmount)

        const flow = Boolean(searchParams.get("flow"))
        if(flow)
            depositAmount(username, paramAmount).then(() => {
                history.push(`${DEPOSIT_SUCCESSFUL}?amount=${paramAmount||1}`)
                logger.sink.log(`deposit for "${username}" registered : ${paramAmount} amount`)
            })


    },[]) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <ScreenWrapper className={`flexCenter`}>
            <LoadingPopup headerTitle={`depositing ${amount}$ to ${username}'s account`} loadingTitle={"Processing..."}/>
        </ScreenWrapper>
    );
}

export default DepositProcessingScreen;