import {silentlyInvokeEntryPoint} from "./API";


export function isLoggedIn() {
    return Boolean(localStorage.getItem("user"))
}

export async function login(username, password) {
    if (!username || !password)
        throw new Error("invalid credentials")

    localStorage.setItem("user", username)

    try {
       await silentlyInvokeEntryPoint()
    } catch (e) {
    }

    return {username};
}


export async function getUserInfo() {
    if (isLoggedIn())
        return {username: localStorage.getItem("user")}
}

export async function logout() {
    localStorage.removeItem("user")
}