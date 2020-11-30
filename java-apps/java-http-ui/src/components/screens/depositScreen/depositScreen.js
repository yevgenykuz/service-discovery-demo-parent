import React from 'react';
import {depositAmount} from "../../../models/API";
import ScreenWrapper from "../../components/screenWrapper";
import styles from "./deposit.module.css"
import LoadingPopup from "../../components/loadingPopup";
import CardWrapper from "../../components/cardWrapper";
import {Alert, Button, Form, Toast} from "react-bootstrap";
import {useUserInfo} from "../../../recoilStates/userAuth";

const pageStates = {
    loading: "loading",
    beforeDeposit: "beforeDeposit",
    afterDeposit: "afterDeposit"
}

function DepositScreen(props) {

    const [amount, setAmount] = React.useState(1)
    const [pageState, setPageState] = React.useState(pageStates.beforeDeposit)
    const [{username}] = useUserInfo()

    function handleSubmit(e) {
        e.preventDefault()
        setPageState(pageStates.loading)
        depositAmount(amount).then(res => setPageState(pageStates.afterDeposit))
    }

    return (
        <ScreenWrapper className={`flexCenter flexColumn ${styles.component}`}>
            {pageState === pageStates.loading ? <LoadingPopup/> :
                <div className={styles.contentContainer}>
                    <CardWrapper className={styles.contentCard}>
                        <Form className={styles.form} onSubmit={handleSubmit}>
                            <Form.Group>
                                <Form.Label>Enter the amount to deposit</Form.Label>
                                <Form.Control type="number" min={1} value={amount}
                                              onChange={e => setAmount(Number(e.target.value))}/>

                            </Form.Group>
                            <Button variant={"info"} className={styles.depositButton} type="submit">Deposit</Button>

                        </Form>
                    </CardWrapper>
                    {pageState === pageStates.afterDeposit &&
                    <Alert className={styles.popup} variant={"success"}>{username} deposited {amount}$</Alert>}
                </div>

            }
        </ScreenWrapper>

    );
}

export default DepositScreen;
