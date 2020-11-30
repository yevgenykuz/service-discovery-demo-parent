import {atom, useRecoilState} from "recoil";


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

export default function useLogger() {
    const [state, setState] = useRecoilState(loggerAtom)

    function log(type, message) {
        setState([...state, {
            message,
            type,
            date: new Date()
        }])
    }

    return {
        getSinkLogs: () => state.filter(x => x.type === logTypes.sink),
        getPropagatorLogs: () => state.filter(x => x.type === logTypes.propagator),
        getEntryPointLogs: () => state.filter(x => x.type === logTypes.entryPoint),
        getAll: () => [...state],
        logSink: (message) => log(logTypes.sink, message),
        logPropagator: (message) => log(logTypes.propagator, message),
        logEntryPoint: (message) => log(logTypes.entryPoint, message),
        clearSinks: () => setState(state.filter(x => x.type !== logTypes.sink)),
        clearPropagators: () => setState(state.filter(x => x.type !== logTypes.propagator)),
        clearEntryPoints: () => setState(state.filter(x => x.type !== logTypes.entryPoint)),
        clearAll: () => setState([]),
        setLogs : (arr)=> setState(arr)
    }

}
