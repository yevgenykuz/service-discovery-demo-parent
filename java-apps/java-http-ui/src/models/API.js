import axios from "axios"

const DEPOSIT_ROUTE = "localhost:8110/prop-name"
const CHECK_BALANCE_ROUTE = "localhost:8110/name"


export function depositAmount(amount) {
    return axios.get(`${DEPOSIT_ROUTE}?name=${amount}`)
}

export async function checkBalance() {
    return new Promise((resolve) => setTimeout(()=>resolve(200),3000))
    // return await axios.get(CHECK_BALANCE_ROUTE)
}