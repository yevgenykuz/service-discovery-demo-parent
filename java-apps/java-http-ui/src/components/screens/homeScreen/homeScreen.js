import React from 'react';
import styles from "./homeScreen.module.css"
import ScreenWrapper from "../../components/screenWrapper";
import {useUserInfo} from "../../../recoilStates/userAuth";
import CardWrapper from "../../components/cardWrapper";

function HomeScreen(props) {

    const [userInfo] = useUserInfo()
    return (
        <ScreenWrapper className={`flexCenter ${styles.component}`}>
            <CardWrapper className={styles.content}>
                <h3>Welcome back {userInfo?.username}</h3>
            </CardWrapper>

        </ScreenWrapper>
    );
}

export default HomeScreen;