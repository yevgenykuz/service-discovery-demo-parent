import {atom, useRecoilState} from "recoil";
import dayjs from "dayjs";


export const loggerAtom = atom({
    key: "logger",
    default: [],
    /*
    * log object:
    * {
    *   type : "sink" | "propagator" | "entryPoint",
    *   message: "...",
    * date: date instance
    * }
    * */
})

export const logTypes = {
    sink: "sink",
    propagator: "propagator",
    entryPoint: "entryPoint",
}

export function getLogsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("logs") || "[]")
}

export function saveLogsToLocalStorage(logs) {
    localStorage.setItem("logs", JSON.stringify(logs))
}

export default function useLogger() {
    const [state, setState] = useRecoilState(loggerAtom)

    function log(type, message) {
        setState((currentState) => [...currentState, {
            message,
            type,
            date: dayjs().set("millisecond",0).toDate()
        }])
    }

    function clearLogs(type) {
        setState(state.filter(x => x.type !== logTypes[type]))
    }

    return {
        sink: {
            logs: state.filter(x => x.type === logTypes.sink),
            log: (message) => log(logTypes.sink, message),
            clear: () => clearLogs(logTypes.sink)
        },
        propagator: {
            logs: state.filter(x => x.type === logTypes.propagator),
            log: (message) => log(logTypes.propagator, message),
            clear: () => clearLogs(logTypes.propagator)
        },
        entryPoint: {
            logs: state.filter(x => x.type === logTypes.entryPoint),
            log: (message) => log(logTypes.entryPoint, message),
            clear: () => clearLogs(logTypes.entryPoint)
        },
        all:{
            logs: state,
            clear: () => setState([])
        },


        logs: state,
        setLogs: setState,
        updateFromLocalStorage: () => {
            const logs = getLogsFromLocalStorage()
            if (logs.length !== state.length)
                setState(logs)
        }
    }

}
