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
        setState((currentState)=>[...currentState, {
            message,
            type,
            date: new Date()
        }])
    }

    return {
       sink:{
           logs: state.filter(x => x.type === logTypes.sink),
           log:(message) => log(logTypes.sink, message),
           clear: () => setState(state.filter(x => x.type !== logTypes.sink))
       },
        propagator:{
            logs: state.filter(x => x.type === logTypes.propagator),
            log:(message) => log(logTypes.propagator, message),
            clear: () => setState(state.filter(x => x.type !== logTypes.propagator))
        },
        entryPoint:{
            logs: state.filter(x => x.type === logTypes.entryPoint),
            log:(message) => log(logTypes.entryPoint, message),
            clear: () => setState(state.filter(x => x.type !== logTypes.entryPoint))
        },
        propagatorLogs:state.filter(x => x.type === logTypes.propagator),
        entryPointLogs:  state.filter(x => x.type === logTypes.entryPoint),
        logs: state,


        logSink: (message) => log(logTypes.sink, message),
        logPropagator: (message) => log(logTypes.propagator, message),
        logEntryPoint: (message) => log(logTypes.entryPoint, message),


        clearAll: () => setState([]),
        setLogs : (arr)=> setState(arr)
    }

}
