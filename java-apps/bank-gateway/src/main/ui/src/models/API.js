import axios from "axios"
import {
    CHECK_BALANCE_DURATION,
    CHECK_LOAN_CREDIBILITY_DURATION,
    CURRENCY_CONVERSION_DURATION,
    DEPOSIT_DURATION
} from "../constants/delayDurations";
import {loggerInstance} from "./logger";
import {USD} from "../constants/convertCurrencyOptions";

const ENTRY_POINT_ORIGIN = process.env.NODE_ENV === "production" ? "" : "http://localhost:8110"
const PROPAGATOR_ORIGIN = process.env.BANK_ANALYSIS_URL || "http://localhost:8111"

export const DEPOSIT_URL = `${ENTRY_POINT_ORIGIN}/prop-name`
export const CHECK_BALANCE_URL = `${ENTRY_POINT_ORIGIN}/name`
export const INVOKE_ENTRY_POINT_URL = `${ENTRY_POINT_ORIGIN}/home`
export const CONVERT_CURRENCY_URL = `${ENTRY_POINT_ORIGIN}/convert-currency`
export const CHECK_LOAN_CREDIBILITY_URL = `${PROPAGATOR_ORIGIN}/check-loan-credibility`

export  function _GET_DEPOSIT(username,amount){
    return  axios.get(`${DEPOSIT_URL}?name=${username}_Deposit_${amount}`)
}
export  function _GET_CHECK_BALANCE(username){
    return  axios.get(`${CHECK_BALANCE_URL}?name=${username}_CheckBalance`)
}
export  function _GET_LOGIN(){
    return axios.get(INVOKE_ENTRY_POINT_URL)
}
export  function _GET_CONVERT_CURRENCY_URL(amount,sourceCur,targetCur){
    return axios.get(`${CONVERT_CURRENCY_URL}?amount=${amount}&sourceCurrency=${sourceCur}&targetCurrency=${targetCur}`)
}
export  function _GET_CHECK_LOAN_CREDIBILITY_URL(username){
    return axios.get(`${CHECK_LOAN_CREDIBILITY_URL}?clientName=${username}`)
}



export function timeoutPromise(time = 1000) {
    return new Promise((resolve) => setTimeout(resolve, time))
}
export async function depositAmount(username, amount) {
    loggerInstance.logEntryPoint(`deposit for "${username}" initiated : ${amount}$`)
    loggerInstance.logPropagator(`deposit for "${username}" processing : ${amount}$`)

    await timeoutPromise(DEPOSIT_DURATION)
    try {
        await _GET_DEPOSIT(username,amount)
    } catch (e) {
    }

    loggerInstance.logSink(`deposit for "${username}" registered : ${amount}$`)

}
export async function checkBalance(username = 'test') {
    loggerInstance.logEntryPoint(`check balance for "${username}" initiated`)

    await timeoutPromise(CHECK_BALANCE_DURATION)
    try {
        await _GET_CHECK_BALANCE(username)
    } catch (e) {
    }

    loggerInstance.logSink(`check balance for "${username}" called `)
    return 100
}

export async function convertCurrency(username,amount, sourceCur, targetCur) {

    loggerInstance.logEntryPoint(`"${username}" requested converting ${amount} ${sourceCur} to ${targetCur} `)

    await timeoutPromise(CURRENCY_CONVERSION_DURATION)

    let ilsRate= 3.25;
    let result;
    try {
        const response = await _GET_CONVERT_CURRENCY_URL(amount,sourceCur,targetCur)
        result = response.data
    } catch (e) {
    }
    if(!result)
        result = sourceCur === USD? amount * ilsRate : amount*(1/ilsRate);

    loggerInstance.logPropagator(`"${username}" responded with  ${result} ${targetCur}`)
    return result;
}

export async function checkLoanCredibility(username) {

    loggerInstance.logPropagator(`checking loan credibility for ${username} `)

    await timeoutPromise(CHECK_LOAN_CREDIBILITY_DURATION)

    let response = `${username} is credible for a loan`;

    try {
       const {data} = await _GET_CHECK_LOAN_CREDIBILITY_URL(username)
        response = data;
    } catch (e) {
    }

    loggerInstance.logSink(response)
    return response;
}
export function silentlyInvokeEntryPoint() {
    return _GET_LOGIN()
}




