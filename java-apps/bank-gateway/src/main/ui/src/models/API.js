import axios from "axios"
import {CHECK_BALANCE_DURATION, CURRENCY_CONVERSION_DURATION, DEPOSIT_DURATION} from "../constants/delayDurations";
import {loggerInstance} from "./logger";
import {USD} from "../constants/convertCurrencyOptions";

const DEPOSIT_ROUTE = "http://localhost:8110/prop-name"
const CHECK_BALANCE_ROUTE = "http://localhost:8110/name"
const INVOKE_ENTRY_POINT = "http://localhost:8110/home"
const CONVERT_CURRENCY = "http://localhost:8110/convert-currency"

export function timeoutPromise(time = 1000) {
    return new Promise((resolve) => setTimeout(resolve, time))
}

export async function depositAmount(username, amount) {
    loggerInstance.logEntryPoint(`deposit for "${username}" initiated : ${amount}$`)
    loggerInstance.logPropagator(`deposit for "${username}" processing : ${amount}$`)

    await timeoutPromise(DEPOSIT_DURATION)
    try {
        await axios.get(`${DEPOSIT_ROUTE}?name=${username}_Deposit_${amount}`)
    } catch (e) {
    }

    loggerInstance.logSink(`deposit for "${username}" registered : ${amount}$`)

}

export async function checkBalance(username = 'test') {
    loggerInstance.logEntryPoint(`check balance for "${username}" initiated`)

    await timeoutPromise(CHECK_BALANCE_DURATION)
    try {
        await axios.get(`${CHECK_BALANCE_ROUTE}?name=${username}_CheckBalance`)
    } catch (e) {
    }

    loggerInstance.logSink(`check balance for "${username}" called `)
    return 100
}

export async function convertCurrency(username,amount, sourceCur, targetCur) {

    loggerInstance.logEntryPoint(`"${username}" requested converting ${amount} ${sourceCur} to ${targetCur} `)

    await timeoutPromise(CURRENCY_CONVERSION_DURATION)

    let ilsRate= 3.25;
    try {
        const {data} = await axios.get("https://api.exchangeratesapi.io/latest?base=USD");
        ilsRate = data?.rates["ILS"];
        await axios.get(`${CONVERT_CURRENCY}?amount=${amount}&sourceCurrency=${sourceCur}&targetCurrency=${targetCur}`)

    } catch (e) {
    }
    const response = sourceCur === USD? amount * ilsRate : amount*(1/ilsRate);

    loggerInstance.logPropagator(`"${username}" responded with  ${response} ${targetCur}`)
    return response;
}

export function silentlyInvokeEntryPoint() {
    return axios.get(INVOKE_ENTRY_POINT)
}




