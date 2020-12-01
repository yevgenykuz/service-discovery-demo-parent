import axios from "axios"
import {CHECK_BALANCE_DURATION, DEPOSIT_DURATION} from "../constants/delayDurations";

const DEPOSIT_ROUTE = "http://localhost:8110/prop-name"
const CHECK_BALANCE_ROUTE = "http://localhost:8110/name"
const INVOKE_ENTRY_POINT = "http://localhost:8110/home"

export function timeoutPromise(time = 1000){
    return new Promise((resolve) => setTimeout(resolve,time))
}

export async function depositAmount(amount) {
    await timeoutPromise(DEPOSIT_DURATION)
    await axios.get(`${DEPOSIT_ROUTE}?name=${amount}`)

}

export async function checkBalance(username='test') {
     await timeoutPromise(CHECK_BALANCE_DURATION)
     await axios.get(`${CHECK_BALANCE_ROUTE}?name=${username}`)
    return 100
}

export function silentlyInvokeEntryPoint(username='test') {
    return axios.get(INVOKE_ENTRY_POINT)
}




