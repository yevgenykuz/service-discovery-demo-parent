import React, {useEffect, useState} from 'react';
import useLogger from "../../recoilStates/logger";

function LogsLoader() {
    const logger = useLogger()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (!loaded) {
            const logs = JSON.parse(localStorage.getItem("logs") || "[]")
            logger.setLogs(logs)
            setLoaded(true)
        }
        localStorage.setItem("logs", JSON.stringify(logger.logs))
    }, [logger.logs])

    return <></>
}

export default LogsLoader;