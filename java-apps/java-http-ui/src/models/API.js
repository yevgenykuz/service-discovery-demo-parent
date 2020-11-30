import axios from "axios"

const DEPOSIT_ROUTE = "http://localhost:8110/prop-name"
const CHECK_BALANCE_ROUTE = "http://localhost:8110/name"
const INVOKE_ENTRY_POINT = "http://localhost:8110/home"

function timeoutPromise(time = 1000){
    return new Promise((resolve) => setTimeout(resolve,time))
}

export async function depositAmount(amount) {
    await timeoutPromise(2000)
    await axios.get(`${DEPOSIT_ROUTE}?name=${amount}`)

}

export async function checkBalance(username='test') {
     await timeoutPromise(2000)
     await axios.get(`${CHECK_BALANCE_ROUTE}?name=${username}`)
    return 100
}

export function silentlyInvokeEntryPoint(username='test') {
    return axios.get(INVOKE_ENTRY_POINT)
}




