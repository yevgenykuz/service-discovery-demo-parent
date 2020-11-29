import React from 'react';
import ScreenWrapper from "../../components";
import {checkBalance} from "../../../models/API";

function BalanceScreen(props) {

    const [balance, setBalance] = React.useState()
    const [isLoading, setIsLoading] = React.useState(true)

    React.useEffect(() => {
        checkBalance().then(value => {
            setBalance(value);
            setIsLoading(false)
        })
    }, [])

        return (
            <ScreenWrapper>
                {isLoading? "loading..." : balance}
            </ScreenWrapper>
        );


}

export default BalanceScreen;