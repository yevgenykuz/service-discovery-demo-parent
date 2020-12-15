

import {atom, useRecoilState} from "recoil"


export const logsAtom = atom({
    key:"allLogs",
    default: {
        sink:[],
        entryPoint:[],
        propagator:[],
        all:[]
    }
})



export function useLogs(){
    return useRecoilState(logsAtom)
}
