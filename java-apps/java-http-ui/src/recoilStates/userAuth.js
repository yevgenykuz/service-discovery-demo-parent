
import {atom, useRecoilState} from "recoil"


export const authAtom = atom({
    key:"auth",
    default:false
})



export default function useIsLoggedInState(){
    return  useRecoilState(authAtom)
}