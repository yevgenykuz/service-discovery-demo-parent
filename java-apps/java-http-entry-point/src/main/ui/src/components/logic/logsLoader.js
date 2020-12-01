import React, {useEffect, useState} from 'react';
import useLogger, {getLogsFromLocalStorage, saveLogsToLocalStorage} from "../../recoilStates/logger";
import {LOGS_UPDATE_DURATION} from "../../constants/delayDurations";

function LogsLoader() {
    const logger = useLogger()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!loaded) {
            const logs = getLogsFromLocalStorage()
            logger.setLogs(logs)
            setLoaded(true)
        }
        saveLogsToLocalStorage(logger.logs)
        const intervalId = setInterval(logger.updateFromLocalStorage, LOGS_UPDATE_DURATION)
        return () => clearInterval(intervalId)
    }, [logger.logs])

    return <></>
}

export default LogsLoader;