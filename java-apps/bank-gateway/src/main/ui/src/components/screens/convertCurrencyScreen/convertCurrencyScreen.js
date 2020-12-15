import React, {useState} from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import CardWrapper from "../../components/cardWrapper";
import {Button, Form} from "react-bootstrap";
import {getAllOptions} from "../../../constants/convertCurrencyOptions";
import styles from "./convertCurrencyScreen.module.css"
import {CONVERT_CURRENCY_PROCESSING} from "../../../constants/routes";
import {useHistory} from "react-router-dom";

function ConvertCurrencyScreen() {
    const history = useHistory()
    const [sourceCur, setSourceCur] = useState("")


    function handleSubmit(e){
        e.preventDefault();
        const formData = new FormData(e.currentTarget)
        history.push(`${CONVERT_CURRENCY_PROCESSING}?amount=${formData.get("amount")}&source=${formData.get("sourceCur")}&target=${formData.get("targetCur")}&flow=true`)
    }

    const toCurOptions = getAllOptions().filter(cur=>cur!== sourceCur)

    return (<ScreenWrapper>
            <CardWrapper className={styles.card}>
                <img src={"/img/exchange.svg"} alt={"deposit icon"} className={`iconMarginMedium iconMedium`}/>
                <Form className={styles.form} onSubmit={handleSubmit}>

                    <Form.Group>
                        <Form.Label>Enter the amount to convert</Form.Label>
                        <Form.Control required type='number' name={'amount'} />
                    </Form.Group>

                    <Form.Group className={styles.fieldWithLabel}>
                        <Form.Label>From</Form.Label>

                        <Form.Control as={'select'} name={'sourceCur'}  required onChange={e => setSourceCur(e.target.value)}>
                            <option value="" className={"capitalize"}>Select Currency</option>
                            {getAllOptions().map((currencyType) =>
                                <option className={"allCaps"} value={currencyType} key={`from_${currencyType}`}>{currencyType}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className={styles.fieldWithLabel}>
                        <Form.Label>To</Form.Label>
                        <Form.Control as={'select'} name={"targetCur"}  required >
                            {toCurOptions.length-1 && <option className={"capitalize"} value="">Select Currency</option>}
                            {toCurOptions.map((currencyType) =>
                                <option className={"allCaps"}  value={currencyType} key={`to_${currencyType}`}>{currencyType}</option>)
                              }
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" className={`capitalize ${styles.submitButton}`} variant={"info"}>Convert</Button>
                </Form>
            </CardWrapper>
        </ScreenWrapper>
    );
}

export default ConvertCurrencyScreen;
