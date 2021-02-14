import {atom, useRecoilState} from "recoil"
import axios from "axios";


export const authAtom = atom({
    key: "userInfo",
    default: {username: undefined}
})


export function useUserInfo() {
    const [state, setState] = useRecoilState(authAtom)

    const setObj = {
        setUserInfo: ({username, token}) => {
            if (username && token) {
                localStorage.setItem("username", username)
                localStorage.setItem("token", token)
                axios.defaults.headers.authorization = `Bearer ${token}`;
                setState({username, token})

            } else {
                localStorage.removeItem("username")
                localStorage.removeItem("token")
                setState({})
            }
        },
        logout: () => setState({})
    }

    return [state, setObj]
}

export function useIsLoggedInState() {
    const [userInfo] = useRecoilState(authAtom)
    return Boolean(userInfo?.username)
}
