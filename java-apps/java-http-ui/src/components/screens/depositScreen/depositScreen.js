import React from 'react';
import {depositAmount} from "../../../models/API";
import ScreenWrapper from "../../components/screenWrapper";

function DepositScreen(props) {

    const [amount,setAmount] = React.useState(1)
    const [isLoading,setIsLoading] = React.useState(false)

    function handleSubmit(e){
        e.preventDefault()
        setIsLoading(true)
        depositAmount(amount).then(res=>setIsLoading(false))
    }

    return (
        <ScreenWrapper>
        <form onSubmit={handleSubmit}>
            <input type="number" min={1} value={amount} onChange={e=>setAmount(Number(e.target.value))}/>
            <input type="submit"/>
            {isLoading&&"loading..."}
        </form>
        </ScreenWrapper>

    );
}

export default DepositScreen;
