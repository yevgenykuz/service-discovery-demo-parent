import React from 'react';
import {depositAmount} from "../../../models/API";
import ScreenWrapper from "../../components/screenWrapper";
import styles from "./deposit.module.css"
import LoadingPopup from "../../components/loadingPopup";
import CardWrapper from "../../components/cardWrapper";
import {Alert, Button, Form} from "react-bootstrap";
import {useUserInfo} from "../../../recoilStates/userAuth";
import {useHistory, useLocation} from "react-router-dom";
import {DEPOSIT, DEPOSIT_PROCESSING, DEPOSIT_SUCCESSFUL} from "../../../constants/routes";
import useLogger from "../../../recoilStates/logger";


function DepositScreen() {

    const [amount, setAmount] = React.useState(1)
    const [lastDeposit, setLastDeposit] = React.useState(0)

    const [{username}] = useUserInfo()
    let {pathname} = useLocation();
    const history = useHistory()
    const logger = useLogger()


    function handleSubmit(e) {
        e.preventDefault()
        history.push(DEPOSIT_PROCESSING)
        logger.entryPoint.log(`deposit for "${username}" initiated : ${amount} amount`)
        logger.propagator.log(`deposit for "${username}" processing : ${amount} amount`)

        depositAmount(username, amount).then(() => {
            setLastDeposit(amount)
            history.push(DEPOSIT_SUCCESSFUL)
            logger.sink.log(`deposit for "${username}" registered : ${amount} amount`)

        })
    }

    return (
        <ScreenWrapper className={`flexCenter flexColumn ${styles.component}`}>
            {pathname === DEPOSIT_PROCESSING ? <LoadingPopup title={"Processing..."}/> :
                <div className={styles.contentContainer}>
                    {pathname === DEPOSIT ?
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
                        :
                        <Alert className={styles.popup} variant={"success"}>{username} deposited {lastDeposit}$</Alert>
                    }

                </div>

            }
        </ScreenWrapper>

    );
}

export default DepositScreen;
