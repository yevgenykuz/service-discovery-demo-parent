export const HOME = "/"
export const LOGIN = "/login"
export const DEPOSIT = "/deposit"
export const DEPOSIT_PROCESSING = "/deposit/processing"
export const DEPOSIT_SUCCESSFUL = "/deposit/successful"
export const CHECK_BALANCE = "/balance"
export const LOGS_ENTRY_POINT = "/logs/entry"
export const LOGS_PROPAGATOR = "/logs/propagator"
export const LOGS_SINK = "/logs/sink"
export const LOGS = "/logs"
export const CONVERT_CURRENCY = "/convert-currency"
export const CONVERT_CURRENCY_PROCESSING = "/convert-currency/processing"
export const CONVERT_CURRENCY_RESULT = "/convert-currency/result"
export const CONVERT_CURRENCY_ERROR = "/convert-currency/error"
export const CHECK_LOAN_CREDIBILITY = "/check-loan-credibility"
export const STRESS_TEST = "/stress-test"

export function getAllowedRoutesWithoutLogin() {
    return [LOGS,
        LOGS_ENTRY_POINT,
        LOGS_PROPAGATOR,
        LOGS_SINK,
        STRESS_TEST
    ]
}

export function getBaseNavBarOptions(){
    return {
        [HOME]:"Home",
    }
}

export function getLoggedInNavBarOptions(){
    return {
        [DEPOSIT]:"Deposit",
        [CHECK_BALANCE]:"Check Balance",
        [CONVERT_CURRENCY]:"Convert Currency",
        [CHECK_LOAN_CREDIBILITY]:"Check Loan Credibility",
    }
}

export function getHomeMenuNavigationOptions(){
    return {
        [DEPOSIT]: {name:"Deposit",iconSrc:"/img/deposit.svg"},
        [CHECK_BALANCE]: {name:"Check Balance",iconSrc:"/img/withdraw.svg"},
        [CONVERT_CURRENCY]: {name:"Convert Currency",iconSrc:"/img/exchange.svg"},
        [CHECK_LOAN_CREDIBILITY]: {name:"Check Loan Credibility",iconSrc:"/img/loan.svg"},

    }
}
