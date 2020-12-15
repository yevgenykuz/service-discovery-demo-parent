import React, {useEffect, useRef, useState} from 'react';
import {login} from "../../../models/auth";
import {useUserInfo} from "../../../recoilStates/userAuth";
import ScreenWrapper from "../../components/screenWrapper";
import styles from "./login.module.css"
import {Alert, Button, Form, Navbar} from "react-bootstrap"
import CardWrapper from "../../components/cardWrapper";
import LoadingPopup from "../../components/loadingPopup";

function LoginScreen() {

    const [error, setErrorMessage] = useState("")
    const [, setObj] = useUserInfo()
    const [isLoading, setIsLoading] = useState(false)

    const userLeftPageRef = useRef(false)
    useEffect(() => () => userLeftPageRef.current = true, [])

    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)


        login(formData.get("username"), formData.get("password")).then(({username}) => {
            if(!userLeftPageRef.current)
            {
                setObj.setUserName(username)
                setIsLoading(false)
            }
        }).catch(e => !userLeftPageRef.current && setErrorMessage(e.message))
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
                                <Form.Control placeholder="Enter username"
                                              className={styles.fieldInput}
                                              type="text"
                                              autoComplete='username'
                                              name="username"
                                              required />
                            </Form.Group>

                            <Form.Group className={styles.field}>
                                <Form.Label>password</Form.Label>
                                <Form.Control placeholder="Enter password"
                                              className={styles.fieldInput}
                                              type="password"
                                              autoComplete='current-password'
                                              name={"password"}
                                              required/>
                            </Form.Group>


                            <Button type="submit" variant={"info"} className={`capitalize ${styles.loginButton}`}>login</Button>
                        </Form>
                    </CardWrapper>
                    <Alert variant={"danger"} className={`${styles.error} ${error ? "" : "noOpacity"}`}>{error}</Alert>

                </>}
            </div>


        </ScreenWrapper>
    );
}

export default LoginScreen;
