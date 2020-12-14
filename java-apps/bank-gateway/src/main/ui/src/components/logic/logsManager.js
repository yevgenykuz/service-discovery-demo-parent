import React, {useEffect, useRef} from 'react';
import {loggerInstance} from "../../models/logger";
import {LOGS_UPDATE_DURATION} from "../../constants/delayDurations";
import {useLogs} from "../../recoilStates/logger";


function LogsManager() {
    const [logsState, setLogsState] = useLogs()
    const logsStateRef = useRef(logsState)

    function updateLogsState() {
        const allLogsState = logsStateRef.current.all;

        if(allLogsState.length === loggerInstance.logs.length && loggerInstance.logs.every((entry,index)=>entry.id === allLogsState[index].id))
            return;

        const newVal = {
            sink: loggerInstance.sinkLogs,
            propagator: loggerInstance.propagatorLogs,
            entryPoint: loggerInstance.entryPointLogs,
            all: loggerInstance.logs
        }
        logsStateRef.current = newVal
        setLogsState(newVal)
    }

    useEffect(() => {

        loggerInstance.loadFromLocalStorage()
        updateLogsState()


        const intervalId = setInterval(() => {
            loggerInstance.loadFromLocalStorage()
            updateLogsState()

        }, LOGS_UPDATE_DURATION)

        return () => clearInterval(intervalId)

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    return <></>
}

export default LogsManager;
