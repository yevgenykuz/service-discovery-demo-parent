import React, {useState} from 'react';
import {registerAndLogin, login} from "../../../models/auth";
import {useUserInfo} from "../../../recoilStates/userAuth";
import ScreenWrapper from "../../components/screenWrapper";
import styles from "./login.module.css"
import {Alert, Button, Form, Navbar} from "react-bootstrap"
import CardWrapper from "../../components/cardWrapper";
import LoadingPopup from "../../components/loadingPopup";

function LoginScreen() {

    const [isRegisterState, setIsRegisterState] = useState(false)
    const [, setUserInfo] = useUserInfo()
    const [error, setErrorMessage] = useState("")
    const [isLoading, setIsLoading] = useState(false)


    function handleSubmit(e) {
        e.preventDefault()
        setIsLoading(true)

        const formData = new FormData(e.currentTarget)
        const username = formData.get("username")
        const password = formData.get("password")

        const submitFunction = isRegisterState ? registerAndLogin : login;

        submitFunction(username, password)
            .then((data) =>
                setUserInfo.setUserInfo(data))
            .catch(e =>
                setErrorMessage(e.message))
            .finally(() =>
                 setIsLoading(false))

    }

    function toggleRegisterState(e) {
        e.preventDefault()
        setIsRegisterState(!isRegisterState)
        setErrorMessage()
    }


    return (
        <ScreenWrapper>

            <div className={styles.contentContainer}>

                {isLoading ? <LoadingPopup loadingTitle={isRegisterState ? "Registering..." : "logging in..."}/> : <>

                    <CardWrapper className={styles.cardWrapper}>
                        <Navbar.Brand as={"div"} className={styles.logoTextContainer}>
                            <span>Bank {isRegisterState && "Registration"}</span>
                        </Navbar.Brand>

                        <Form onSubmit={handleSubmit} className={styles.form}>
                            <Form.Group className={styles.field}>
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Enter Username"
                                              className={styles.fieldInput}
                                              type="text"
                                              autoComplete='username'
                                              name="username"
                                              required/>
                            </Form.Group>

                            <Form.Group className={styles.field}>
                                <Form.Label>Password</Form.Label>
                                <Form.Control placeholder="Enter Password"
                                              className={styles.fieldInput}
                                              type="password"
                                              autoComplete={isRegisterState ? 'new-password' : 'current-password'}
                                              name={"password"}
                                              required/>
                            </Form.Group>


                            <Button type="submit"
                                    variant={"success"}
                                    className={`capitalize ${styles.loginButton}`}>
                                {isRegisterState ? "register" : "login"}
                            </Button>

                            <a href="/" onClick={toggleRegisterState} className={styles.registerButton}>{
                                isRegisterState ? "Already have an account? Click here to login."
                                    : "Don't have an account yet? Click here to register."}
                            </a>
                        </Form>
                    </CardWrapper>
                    <Alert variant={"danger"} className={`${styles.error} ${error ? "" : "noOpacity"}`}>{error}</Alert>

                </>}
            </div>


        </ScreenWrapper>
    );
}

export default LoginScreen;
