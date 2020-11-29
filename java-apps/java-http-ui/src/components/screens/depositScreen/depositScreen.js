import React from 'react';
import {depositAmount} from "../../../models/API";
import ScreenWrapper from "../../components";

function DepositScreen(props) {

    const [amount,setAmount] = React.useState(1)

    function handleSubmit(e){
        e.preventDefault()
        depositAmount(amount)
    }

    return (
        <ScreenWrapper>
        <form onSubmit={handleSubmit}>
            <input type="number" min={1} value={amount} onChange={e=>setAmount(Number(e.target.value))}/>
            <input type="submit"/>

        </form>
        </ScreenWrapper>

    );
}

export default DepositScreen;
