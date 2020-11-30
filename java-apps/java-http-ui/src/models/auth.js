export function isLoggedIn() {
    return Boolean(localStorage.getItem("user"))
}

export async function login(username, password) {

        if (username === "admin" && password === "123456") {
            localStorage.setItem("user", username)
            return  {username};
        }
         throw new Error("incorrect credentials")
}


export async function getUserInfo() {
        if (isLoggedIn())
            return  {username: localStorage.getItem("user")}
}

export async function logout() {
        localStorage.removeItem("user")
}