import React, {useEffect} from 'react';
import styles from "./homeScreen.module.css"
import ScreenWrapper from "../../components/screenWrapper";
import {useUserInfo} from "../../../recoilStates/userAuth";
import CardWrapper from "../../components/cardWrapper";
import HomeMenuButton from "../../components/homeMenuButton";
import {getHomeMenuNavigationOptions} from "../../../constants/routes";
import {Link} from "react-router-dom";
import {silentlyInvokeEntryPoint} from "../../../models/API";
import {isLoggedIn} from "../../../models/auth";

function HomeScreen() {

    const [userInfo] = useUserInfo()

    //invoke "/home" route whenever the user goes to the home page while logged in
    useEffect(() => {
        (async () => {
            if (await isLoggedIn() && userInfo.token)
                await silentlyInvokeEntryPoint()
        })().catch()
    },[userInfo])

    return (
        <ScreenWrapper>

            <CardWrapper className={`${styles.welcome} capitalize`}>
                <h3>Welcome back {userInfo?.username}</h3>
            </CardWrapper>

            <div className={styles.menu}>
                {Object.entries(getHomeMenuNavigationOptions()).map(([route, {name, iconSrc}]) =>
                    <Link to={route} key={`homeMenu_${route}`}><HomeMenuButton label={name} iconSrc={iconSrc}/></Link>
                )}
            </div>

        </ScreenWrapper>
    );
}

export default HomeScreen;
