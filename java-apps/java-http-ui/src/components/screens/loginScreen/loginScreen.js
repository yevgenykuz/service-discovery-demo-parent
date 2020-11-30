import React, {useState} from 'react';
import {login} from "../../../models/auth";
import {useUserInfo} from "../../../recoilStates/userAuth";
import ScreenWrapper from "../../components/screenWrapper";
import styles from "./login.module.css"
import {Alert, Button, Form} from "react-bootstrap"

function LoginScreen(props) {
    const [userName, setUserName] = useState("")
    const [pass, setPass] = useState("")
    const [error, setErrorMessage] = useState("")
    const [_, setObj] = useUserInfo()

    function handleSubmit(e) {
        e.preventDefault()
        login(userName, pass).then(({username}) => setObj.setUserName(username)).catch(e => setErrorMessage(e.message));
    }


    return (
        <ScreenWrapper className={styles.component}>


            <Form onSubmit={handleSubmit} className={styles.form}>
                <Form.Group className={styles.field}>
                    <Form.Label>username</Form.Label>
                    <Form.Control placeholder="Enter username" className={styles.fieldInput} type="text" value={userName} onChange={(e) => setUserName(e.target.value)}/>
                </Form.Group>

                <Form.Group className={styles.field}>
                <Form.Label>password</Form.Label>
                <Form.Control  placeholder="Enter password" className={styles.fieldInput} type="password" value={pass} onChange={e => setPass((e.target.value))}/>
                </Form.Group>


                <Button type="submit" variant={"info"} className={styles.loginButton}>login</Button>
            </Form>
            <Alert variant={"danger"} className={`${styles.error} ${error?"":"noOpacity"}`}>{error}</Alert>

        </ScreenWrapper>
    );
}

export default LoginScreen;