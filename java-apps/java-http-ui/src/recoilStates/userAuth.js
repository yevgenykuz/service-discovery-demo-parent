
import {atom, useRecoilState} from "recoil"


export const authAtom = atom({
    key:"userInfo",
    default: { username: undefined }
})


export function useUserInfo(){
    const [state,setState] = useRecoilState(authAtom)

    const setObj = {
        setUserName:(username) => setState({username}),
        logout:()=>setState({})
    }

    return [state,setObj]
}

export  function useIsLoggedInState(){
    const [userInfo] = useRecoilState(authAtom)
    return Boolean(userInfo?.username)
}