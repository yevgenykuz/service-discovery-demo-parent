import React, {useEffect, useRef, useState} from 'react';
import {login} from "../../../models/auth";
import {useUserInfo} from "../../../recoilStates/userAuth";
import ScreenWrapper from "../../components/screenWrapper";
import styles from "./login.module.css"
import {Alert, Button, Form, Navbar} from "react-bootstrap"
import CardWrapper from "../../components/cardWrapper";
import LoadingPopup from "../../components/loadingPopup";

function LoginScreen() {
    const [userName, setUserName] = useState("")
    const [pass, setPass] = useState("")
    const [error, setErrorMessage] = useState("")
    const [, setObj] = useUserInfo()
    const [isLoading, setIsLoading] = useState(false)

    const userLeftPageRef = useRef(false)
    useEffect(() => () => userLeftPageRef.current = true, [])

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)
        login(userName, pass).then(({username}) => {
            !userLeftPageRef.current && setObj.setUserName(username)
        }).catch(e => setErrorMessage(e.message)).finally(() =>
            !userLeftPageRef.current && setIsLoading(false)
        );
    }


    return (
        <ScreenWrapper>

            <div className={styles.contentContainer}>

                {isLoading ? <LoadingPopup loadingTitle={"logging in..."}/> : <>

                    <CardWrapper className={styles.cardWrapper}>
                        <Navbar.Brand as={"div"} className={styles.logoTextContainer}>
                            <span>Bank</span>
                        </Navbar.Brand>

                        <Form onSubmit={handleSubmit} className={styles.form}>
                            <Form.Group className={styles.field}>
                                <Form.Label>username</Form.Label>
                                <Form.Control placeholder="Enter username" className={styles.fieldInput} type="text"
                                              autoComplete='username'
                                              value={userName} onChange={(e) => setUserName(e.target.value)}/>
                            </Form.Group>

                            <Form.Group className={styles.field}>
                                <Form.Label>password</Form.Label>
                                <Form.Control placeholder="Enter password" className={styles.fieldInput} type="password"
                                              autoComplete='current-password'
                                              value={pass} onChange={e => setPass((e.target.value))}/>
                            </Form.Group>


                            <Button type="submit" variant={"info"} className={styles.loginButton}>login</Button>
                        </Form>
                    </CardWrapper>
                    <Alert variant={"danger"} className={`${styles.error} ${error ? "" : "noOpacity"}`}>{error}</Alert>

                </>}
            </div>


        </ScreenWrapper>
    );
}

export default LoginScreen;
