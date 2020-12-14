import React, {useState} from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import CardWrapper from "../../components/cardWrapper";
import {Button, Form} from "react-bootstrap";
import {getAllOptions} from "../../../constants/convertCurrencyOptions";
import styles from "./convertCurrencyScreen.module.css"

function ConvertCurrencyScreen() {

    const [fromCur, setFromCur] = useState("")
    const [toCur, setToCur] = useState("")
    const [amount, setAmount] = useState(0)
    const toCurOptions = getAllOptions().filter(cur=>cur!== fromCur)
    return (<ScreenWrapper className="flexCenter">
            <CardWrapper className={styles.card}>
                <img src={"/img/exchange.svg"} alt={"deposit icon"} className={`iconMarginMedium iconMedium`}/>
                <Form className={styles.form}>

                    <Form.Group>
                        <Form.Label>Enter the amount to convert</Form.Label>
                        <Form.Control required type='number' value={amount} onChange={(e) =>
                            setAmount(e.target.value ? Number(e.target.value) : "")}
                        />
                    </Form.Group>

                    <Form.Group className={styles.fieldWithLabel}>
                        <Form.Label>From</Form.Label>

                        <Form.Control as={'select'} value={fromCur||""} required onChange={e => setFromCur(e.target.value)}>
                            <option value="">Select Currency</option>
                            {getAllOptions().map((currencyType) =>
                                <option value={currencyType} key={`from_${currencyType}`}>{currencyType}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group className={styles.fieldWithLabel}>
                        <Form.Label>To</Form.Label>
                        <Form.Control as={'select'} value={toCur||""} required onChange={e => setToCur(e.target.value)}>
                            {toCurOptions.length-1 && <option value="">Select Currency</option>}
                            {toCurOptions.map((currencyType) =>
                                <option value={currencyType} key={`to_${currencyType}`}>{currencyType}</option>)
                              }
                        </Form.Control>
                    </Form.Group>
                    <Button type="submit" className={styles.submitButton} variant={"info"}>Convert</Button>
                </Form>

            </CardWrapper>
        </ScreenWrapper>
    );
}

export default ConvertCurrencyScreen;
