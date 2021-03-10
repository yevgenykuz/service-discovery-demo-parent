import {timeoutPromise, _POST_REGISTER, _POST_LOGIN, _GET_IS_LOGGED_IN} from "./API";
import {LOGIN_DURATION, REGISTER_DURATION} from "../constants/delayDurations";
import {loggerInstance} from "./logger";


export async function login(username, password) {
    if (!username || !password)
        throw new Error("Invalid input provided")

    await timeoutPromise(LOGIN_DURATION)

    try {
        const res = await _POST_LOGIN(username, password)
        if (res.status === 403) {
            const error = new Error("Invalid credentials")
            error.show = true;
            throw error;
        }

        loggerInstance.logEntryPoint(`"${username}" has logged in`)
        return {token: res.data.token, username}

    } catch (e) {
        if (e.show) throw e;
        throw new Error("Something went wrong :(")
    }

}

export async function registerAndLogin(username, password) {

    if (!username || !password)
        throw new Error("Invalid input provided")

    await timeoutPromise(REGISTER_DURATION)

    try {
        const res = await _POST_REGISTER(username, password)
        const {token} = res.data;
        loggerInstance.logEntryPoint(`"${username}" has registered and logged in`)
        return {token, username}
    } catch (e) {
        throw new Error("Something went wrong :(")
    }
}

export async function logout() {
    loggerInstance.logEntryPoint(`"${localStorage.getItem("username")}" has logged out`)
    localStorage.removeItem("username")
    localStorage.removeItem("token")
}

export async function isLoggedIn() {
    if (Boolean(!localStorage.getItem("token")) && !Boolean(localStorage.getItem("username")))
        return false;

    try {
        await _GET_IS_LOGGED_IN(localStorage.getItem("token"))
        return true
    } catch (e) {
    }
    
    return false;
}

export async function checkLoginState() {
    const loggedIn = await isLoggedIn()
    if (loggedIn)
        return {username: localStorage.getItem("username"), token: localStorage.getItem("token")}
    else {
        localStorage.setItem("username", "")
        localStorage.setItem("token", "")
    }
    return {}
}
