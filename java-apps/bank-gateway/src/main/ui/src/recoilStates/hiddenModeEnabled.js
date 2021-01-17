import {atom, useRecoilValue, useSetRecoilState} from "recoil"
import React from 'react'

export const hiddenModeEnabledAtom = atom({
    key: "hiddenFeatures",
    default: localStorage.getItem("hiddenMode") === "1"
})

/**@returns {boolean} isHiddenFeaturesEnabled */
export function useHiddenMode() {
    return useRecoilValue(hiddenModeEnabledAtom)
}


export function useListenForKeyStroke() {
    const setState = useSetRecoilState(hiddenModeEnabledAtom)

    React.useEffect(() => {
        console.log("press ` (back tick) twice to enable hidden features")

        let count = 0;
        let lastKeyTime = Date.now();
        function toggleHiddenMode(){
            setState(val => {
                localStorage.setItem("hiddenMode", !val?"1":"0")
                return !val
            })
        }
        function keyDownHandler(event) {
            const key = event.key?.toLowerCase()
            if (key !== "`") return;

            const currentTime = Date.now();

            if (currentTime - lastKeyTime < 500) count++;
            else  count = 1

            if (count === 2) {
                toggleHiddenMode()
                count = 0;
            }

            lastKeyTime = currentTime;
        }


        document.addEventListener("keydown", keyDownHandler)
        return () => document.removeEventListener("keydown", keyDownHandler)
    }, [])
}
