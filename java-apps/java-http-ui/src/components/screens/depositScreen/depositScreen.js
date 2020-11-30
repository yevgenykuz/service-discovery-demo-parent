import React, {useEffect} from 'react';
import {depositAmount} from "../../../models/API";
import ScreenWrapper from "../../components/screenWrapper";
import styles from "./deposit.module.css"
import LoadingPopup from "../../components/loadingPopup";
import CardWrapper from "../../components/cardWrapper";
import {Alert, Button, Form} from "react-bootstrap";
import {useUserInfo} from "../../../recoilStates/userAuth";
import {useHistory, useLocation} from "react-router-dom";
import {DEPOSIT_PROCESSING, DEPOSIT_SUCCESSFUL} from "../../../constants/routes";
import {DEPOSIT_DURATION} from "../../../constants/delayDurations";
import useLogger from "../../../recoilStates/logger";


function DepositScreen(props) {

    const [amount, setAmount] = React.useState(1)
    const [lastDeposit, setLastDeposit] = React.useState(0)

    const [{username}] = useUserInfo()
    let {pathname} = useLocation();
    const history = useHistory()
    const logger = useLogger()


    function handleSubmit(e) {
        e.preventDefault()
        history.push(DEPOSIT_PROCESSING)
        logger.logEntryPoint(`deposit for "${username}" initiated : ${amount} amount`)
        logger.logPropagator(`deposit for "${username}" processing : ${amount} amount`)

        depositAmount(amount).then(res => {
            setLastDeposit(amount)
            history.push(DEPOSIT_SUCCESSFUL)
            logger.logSink(`deposit for "${username}" registered : ${amount} amount`)

        })
    }

    return (
        <ScreenWrapper className={`flexCenter flexColumn ${styles.component}`}>
            {pathname === DEPOSIT_PROCESSING ? <LoadingPopup title={"Processing..."}/> :
                <div className={styles.contentContainer}>
                    <CardWrapper className={styles.contentCard}>
                        <img src={"/img/deposit.svg"} alt={"deposit icon"} className={styles.depositIcon}/>
                        <Form className={styles.form} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Enter the amount to deposit</Form.Label>
                                <Form.Control type="number" min={1} value={amount}
                                              onChange={e => setAmount(Number(e.target.value))}/>

                            </Form.Group>
                            <Button variant={"info"} className={styles.depositButton} type="submit">Deposit</Button>

                        </Form>
                    </CardWrapper>
                    {pathname === DEPOSIT_SUCCESSFUL &&
                    <Alert className={styles.popup} variant={"success"}>{username} deposited {lastDeposit}$</Alert>}
                </div>

            }
        </ScreenWrapper>

    );
}

export default DepositScreen;
