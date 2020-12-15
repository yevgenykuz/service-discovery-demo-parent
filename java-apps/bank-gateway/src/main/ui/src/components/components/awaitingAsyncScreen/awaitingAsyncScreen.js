import React, {useEffect, useRef} from 'react';
import ScreenWrapper from "../screenWrapper";
import LoadingPopup from "../loadingPopup";
import styles from "../../screens/balanceScreen/balanceScreen.module.css";


function AwaitingAsyncScreen({loadingHeader, loadingTitle, fetchTask, loadingComponent,children,loadingComponentProps= {}}) {
    const [isLoading, setIsLoading] = React.useState(true)
    const [response, setResponse] = React.useState(true)
    const userLeftPageRef = useRef(false)


    useEffect(() => {

        (async () => {
            const taskResponse = await fetchTask?.()
            if (!userLeftPageRef.current) {
                setResponse(taskResponse)
                setIsLoading(false)
            }
        })()

        return () => userLeftPageRef.current = true

    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function renderLoading() {
        if (loadingComponent)
            return loadingComponent;

        return <LoadingPopup
            className={styles.loadingContainer}
            headerTitle={loadingHeader}
            loadingTitle={loadingTitle} {...loadingComponentProps}/>
    }

    return (
        <ScreenWrapper>
            {isLoading ? renderLoading() : children?.(response)}
        </ScreenWrapper>
    );


}

export default AwaitingAsyncScreen;
