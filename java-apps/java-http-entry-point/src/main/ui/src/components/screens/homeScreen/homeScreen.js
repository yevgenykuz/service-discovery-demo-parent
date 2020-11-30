import React from 'react';
import styles from "./homeScreen.module.css"
import ScreenWrapper from "../../components/screenWrapper";
import {useUserInfo} from "../../../recoilStates/userAuth";
import CardWrapper from "../../components/cardWrapper";
import HomeMenuButton from "../../components/homeMenuButton";
import {CHECK_BALANCE, DEPOSIT} from "../../../constants/routes";
import {Link} from "react-router-dom";

function HomeScreen() {

    const [userInfo] = useUserInfo()
    return (
        <ScreenWrapper className={`flexCenter flexColumn ${styles.component}`}>

            <CardWrapper className={styles.welcome}>
                <h3>Welcome back {userInfo?.username}</h3>
            </CardWrapper>

        <div className={styles.menu}>
            <Link to={DEPOSIT}><HomeMenuButton label={"Deposit"} iconSrc={"/img/deposit.svg"}  /></Link>
            <Link to={CHECK_BALANCE}><HomeMenuButton label={"Check Balance"}  iconSrc={"/img/withdraw.svg"} /></Link>
        </div>

        </ScreenWrapper>
    );
}

export default HomeScreen;