import axios from "axios"

const DEPOSIT_ROUTE = "http://localhost:8110/prop-name"
const CHECK_BALANCE_ROUTE = "http://localhost:8110/name"

function timeoutPromise(time = 1000){
    return new Promise((resolve) => setTimeout(resolve,time))
}

export async function depositAmount(amount) {
    await timeoutPromise(2000)
    await axios.get(`${DEPOSIT_ROUTE}?name=${amount}`)

}

export async function checkBalance() {
     await timeoutPromise(2000)
     await axios.get(`${CHECK_BALANCE_ROUTE}?name=test`)
    return 100
}