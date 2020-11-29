import React from 'react';
import {depositAmount} from "../../../models/API";

function DepositScreen(props) {

    const [amount,setAmount] = React.useState(1)

    function handleSubmit(e){
        e.preventDefault()
        depositAmount(amount)
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" min={1} value={amount} onChange={e=>setAmount(Number(e.target.value))}/>
            <input type="submit"/>

        </form>
    );
}

export default DepositScreen;
