import React, {useEffect} from 'react';
import {useUserInfo} from "../../../recoilStates/userAuth";
import {useHistory, useLocation} from "react-router-dom";
import {convertCurrency} from "../../../models/API";
import {CONVERT_CURRENCY_ERROR, CONVERT_CURRENCY_RESULT} from "../../../constants/routes";
import ScreenWrapper from "../../components/screenWrapper";
import LoadingPopup from "../../components/loadingPopup";
import {GBP, USD} from "../../../constants/convertCurrencyOptions";

function ConvertCurrencyProcessingScreen() {
    const [{username}] = useUserInfo()
    let {search} = useLocation();
    const history = useHistory()


    useEffect(() => {
        const searchParams = new URLSearchParams(search)
        const amount = searchParams.get("amount") || "1";
        const sourceCur = searchParams.get("source") || USD;
        const targetCur = searchParams.get("target") || GBP;
        const flow = searchParams.get("flow")?.toLowerCase() === "true"

        if (!flow)
            return;

        convertCurrency(username, amount, sourceCur, targetCur).then((response) => {
            history.push(`${CONVERT_CURRENCY_RESULT}?amount=${amount}&source=${sourceCur}&target=${targetCur}&result=${response}`)
        }).catch(()=>{
            history.push(CONVERT_CURRENCY_ERROR)
        })


    }, []) // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <ScreenWrapper>
            <LoadingPopup headerTitle={`processing currency conversion request`} loadingTitle={"Processing..."}/>
        </ScreenWrapper>
    );
}

export default ConvertCurrencyProcessingScreen;
