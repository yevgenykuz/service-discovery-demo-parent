import React, {useEffect, useState} from 'react';
import useLogger, {getLogsFromLocalStorage, saveLogsToLocalStorage} from "../../recoilStates/logger";

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
    }, [logger.logs])

    return <></>
}

export default LogsLoader;