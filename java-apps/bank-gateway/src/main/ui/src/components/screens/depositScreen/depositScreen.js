import React from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import styles from "./deposit.module.css"
import CardWrapper from "../../components/cardWrapper";
import {Button, Form} from "react-bootstrap";
import {useUserInfo} from "../../../recoilStates/userAuth";
import {useHistory} from "react-router-dom";
import {DEPOSIT_PROCESSING} from "../../../constants/routes";
import useLogger from "../../../recoilStates/logger";


function DepositScreen() {

    const [amount, setAmount] = React.useState(1)
    const [{username}] = useUserInfo()
    const history = useHistory()
    const logger = useLogger()


    function handleSubmit(e) {
        e.preventDefault()
        history.push(`${DEPOSIT_PROCESSING}?amount=${amount}&flow=true`)
        logger.entryPoint.log(`deposit for "${username}" initiated : ${amount} amount`)
        logger.propagator.log(`deposit for "${username}" processing : ${amount} amount`)
    }

    return (
        <ScreenWrapper className={`flexCenter flexColumn ${styles.component}`}>

                <CardWrapper className={styles.contentCard}>
                    <img src={"/img/deposit.svg"} alt={"deposit icon"} className={`iconMarginMedium iconMedium`}/>
                    <Form className={styles.form} onSubmit={handleSubmit}>
                        <Form.Group>
                            <Form.Label>Enter the amount to deposit</Form.Label>
                            <div className={"flexCenter"}>
                                <Form.Control type="number" min={1} value={amount}
                                              onChange={e => setAmount(Number(e.target.value))}/>
                                <h5 className={styles.dollar}>$</h5>
                            </div>

                        </Form.Group>
                        <Button variant={"info"} className={styles.depositButton} type="submit">Deposit</Button>

                    </Form>
                </CardWrapper>


        </ScreenWrapper>

    );
}

export default DepositScreen;
