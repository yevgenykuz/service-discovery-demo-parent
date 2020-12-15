import {silentlyInvokeEntryPoint, timeoutPromise} from "./API";
import {LOGIN_DURATION} from "../constants/delayDurations";
import {loggerInstance} from "./logger";


export async function isLoggedIn() {
    return Boolean(localStorage.getItem("user"))
}

export async function login(username, password) {
    if (!username || !password)
        throw new Error("invalid credentials")

    await timeoutPromise(LOGIN_DURATION)

    localStorage.setItem("user", username)

    loggerInstance.logEntryPoint(`"${username}" has logged in`)

    try {
       await silentlyInvokeEntryPoint()
    } catch (e) {
    }

    return {username};
}


export async function getUserInfo() {
    const loggedIn = await isLoggedIn()
    if (loggedIn)
    {
        try {
            await silentlyInvokeEntryPoint()
        } catch (e) {
        }
        return {username: localStorage.getItem("user")}
    }

    return {}
}

export async function logout() {
    loggerInstance.logEntryPoint(`"${localStorage.getItem("user")}" has logged out`)
    localStorage.removeItem("user")
}
