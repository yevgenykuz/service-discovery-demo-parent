import React from 'react';
import styles from "./homeScreen.module.css"
import ScreenWrapper from "../../components/screenWrapper";
import {useUserInfo} from "../../../recoilStates/userAuth";
import CardWrapper from "../../components/cardWrapper";
import HomeMenuButton from "../../components/homeMenuButton";

function HomeScreen() {

    const [userInfo] = useUserInfo()
    return (
        <ScreenWrapper className={`flexCenter flexColumn ${styles.component}`}>

            <CardWrapper className={styles.welcome}>
                <h3>Welcome back {userInfo?.username}</h3>
            </CardWrapper>

        <div className={styles.menu}>
            <HomeMenuButton label={"deposit"} iconSrc={"/img/deposit.svg"} />
            <HomeMenuButton label={"check balance"}/>
        </div>

        </ScreenWrapper>
    );
}

export default HomeScreen;