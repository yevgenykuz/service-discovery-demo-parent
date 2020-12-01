import React, {useState} from 'react';
import {login} from "../../../models/auth";
import {useUserInfo} from "../../../recoilStates/userAuth";
import ScreenWrapper from "../../components/screenWrapper";
import styles from "./login.module.css"
import {Alert, Button, Form, Navbar} from "react-bootstrap"
import CardWrapper from "../../components/cardWrapper";
import useLogger from "../../../recoilStates/logger";
import LoadingPopup from "../../components/loadingPopup";

function LoginScreen() {
    const [userName, setUserName] = useState("")
    const [pass, setPass] = useState("")
    const [error, setErrorMessage] = useState("")
    const [, setObj] = useUserInfo()
    const [isLoading, setIsLoading] = useState(false)
    const logger = useLogger()

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        login(userName, pass).then(({username}) => {
            logger.entryPoint.log(`"${userName}" has logged in`)
            setObj.setUserName(username)
        }).catch(e => setErrorMessage(e.message)).finally(() => setIsLoading(false)
        );
    }


    return (
        <ScreenWrapper className={styles.component} containerClassName={styles.containerClassName}>

            {isLoading ? <LoadingPopup title={"logging in..."}/> : <>

                <CardWrapper className={styles.cardWrapper}>
                    <Navbar.Brand as={"div"} className={styles.logoTextContainer}>
                        <span>Bank</span>
                    </Navbar.Brand>

                    <Form onSubmit={handleSubmit} className={styles.form}>
                        <Form.Group className={styles.field}>
                            <Form.Label>username</Form.Label>
                            <Form.Control placeholder="Enter username" className={styles.fieldInput} type="text"
                                          value={userName} onChange={(e) => setUserName(e.target.value)}/>
                        </Form.Group>

                        <Form.Group className={styles.field}>
                            <Form.Label>password</Form.Label>
                            <Form.Control placeholder="Enter password" className={styles.fieldInput} type="password"
                                          value={pass} onChange={e => setPass((e.target.value))}/>
                        </Form.Group>


                        <Button type="submit" variant={"info"} className={styles.loginButton}>login</Button>
                    </Form>
                </CardWrapper>
                <Alert variant={"danger"} className={`${styles.error} ${error ? "" : "noOpacity"}`}>{error}</Alert>

            </>}


        </ScreenWrapper>
    );
}

export default LoginScreen;