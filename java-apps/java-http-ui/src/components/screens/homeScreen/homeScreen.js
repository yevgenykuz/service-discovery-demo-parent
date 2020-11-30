import React from 'react';
import styles from "./homeScreen.module.css"
import ScreenWrapper from "../../components/screenWrapper";
import {useUserInfo} from "../../../recoilStates/userAuth";

function HomeScreen(props) {

    const [userInfo] = useUserInfo()
    return (
        <ScreenWrapper className={styles.component}>
            <h3>Welcome back {userInfo?.username}</h3>

        </ScreenWrapper>
    );
}

export default HomeScreen;