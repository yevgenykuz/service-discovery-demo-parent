import React, {useEffect} from 'react';
import Chance from "chance"
import styles from "./stressTestScreen.module.css"
import ScreenWrapper from "../../components/screenWrapper";
import CardWrapper from "../../components/cardWrapper";
import {Button, FormControl, InputGroup} from "react-bootstrap";
import {
    _GET_CHECK_BALANCE,
    _GET_CHECK_LOAN_CREDIBILITY_URL,
    _GET_CONVERT_CURRENCY_URL,
    _GET_DEPOSIT, _POST_REGISTER,
    CHECK_BALANCE_URL,
    CHECK_LOAN_CREDIBILITY_URL,
    CONVERT_CURRENCY_URL,
    DEPOSIT_URL,
    INVOKE_ENTRY_POINT_URL, silentlyInvokeEntryPoint,
} from "../../../models/API";
import {getAllOptions} from "../../../constants/convertCurrencyOptions";
import axios from "axios";


//randomizer------------------------------------------------------------------
const chance = new Chance();
const randomUserName = () => chance.first()
const randomNumber = () => chance.integer({min: 1, max: 10000})
const randomCurrency = () => chance.shuffle(getAllOptions());


const options = {
    [DEPOSIT_URL]: () => _GET_DEPOSIT(randomUserName(), randomNumber()),
    [CHECK_BALANCE_URL]: () => _GET_CHECK_BALANCE(randomUserName()),
    [INVOKE_ENTRY_POINT_URL]: silentlyInvokeEntryPoint,
    [CONVERT_CURRENCY_URL]: () => _GET_CONVERT_CURRENCY_URL(randomNumber(), ...randomCurrency()),
    [CHECK_LOAN_CREDIBILITY_URL]: () => _GET_CHECK_LOAN_CREDIBILITY_URL(randomUserName()),
}

//rendering an entry-------------------------------------------------------------
function renderField({route, onChange, checked, disabled, onInvokeClick}) {
    return <InputGroup className="mb-3" key={route}>
        <InputGroup.Prepend>
            <InputGroup.Checkbox disabled={disabled} onChange={() => onChange(route)} checked={checked}
                                 aria-label="Checkbox for following text input"/>
        </InputGroup.Prepend>
        <FormControl
            onClick={() => onChange(route)}
            value={route}
            isValid={checked}
            disabled={disabled}
            readOnly={true}
            aria-label="Text input with checkbox"/>
        <Button onClick={onInvokeClick} variant={"warning"}>Invoke</Button>
    </InputGroup>
}


//rendering all entries----------------------------------------------------------
function StressTestScreen() {
    const [started, setStarted] = React.useState(false)
    const [routesToRun, setRoutesToRun] = React.useState([])
    const [frequencyMS, setFrequencyMS] = React.useState(3000)
    const [invokeAll, setInvokeAll] = React.useState(false)
    const lastIntervalId = React.useRef(-1)

    useEffect(()=>{

        //get access token
        _POST_REGISTER("username","password").then(({data: {token}})=> {
            axios.defaults.headers.authorization = `Bearer ${token}`;
        }).catch(e=> {
            console.error("was unable to generate an authorization token :(")
            console.error(e)
        })

        //restore previous access token on page leave
        return ()=> axios.defaults.headers.authorization = localStorage.getItem('token');
    },[])

    useEffect(() => {
        clearInterval(lastIntervalId.current)
        if (started)
            lastIntervalId.current = setInterval(() => {
                if (invokeAll)
                    routesToRun.forEach(key => options[key]()).catch(console.log)
                else options[chance.pick(routesToRun)]().catch(console.log)

            }, frequencyMS)

    }, [started])

    const toggleStarted = React.useCallback(() => {
        setStarted(prev => routesToRun.length && !prev)
    }, [routesToRun])
    const toggleInvokeAll = React.useCallback(() => {
        setInvokeAll(prev => !prev)
    }, [])
    const toggleChecked = React.useCallback((route) =>
            setRoutesToRun(prev => prev.includes(route) ? prev.filter(x => x !== route) : [...prev, route])
        , [])
    const onFrequencyChange = React.useCallback((e) => setFrequencyMS(Number(e.target.value)), [])

    const formFields = React.useMemo(() =>
        Object.keys(options).map((route) => renderField({
                route,
                onChange: toggleChecked,
                disabled: started,
                checked: routesToRun.includes(route),
                onInvokeClick: options[route]
            })
        ), [routesToRun, started])


    return (<ScreenWrapper>
            <CardWrapper className={styles.component}>
                <div className={styles.list}>
                    {formFields}
                </div>

                <div className={styles.footer}>

                    <InputGroup className={`mb-3`}>
                        <InputGroup.Prepend>
                            <InputGroup.Checkbox checked={invokeAll} disabled={started} onChange={toggleInvokeAll}/>
                        </InputGroup.Prepend>
                        <FormControl value={'Invoke selected on every iteration'} onClick={toggleInvokeAll}
                                     disabled={started} isValid={invokeAll} readOnly={true}/>
                    </InputGroup>

                    <InputGroup className={"mb-3"}>
                        <InputGroup.Prepend>
                            <InputGroup.Text>frequency</InputGroup.Text>
                        </InputGroup.Prepend>
                        <FormControl type={'number'} disabled={started} value={frequencyMS} onChange={onFrequencyChange}
                                     min={10} max={5000}/>
                        <InputGroup.Append>
                            <InputGroup.Text>ms</InputGroup.Text>
                        </InputGroup.Append>
                    </InputGroup>
                    <FormControl type={'range'} disabled={started} value={frequencyMS} onChange={onFrequencyChange}
                                 min={10} max={10000}/>
                    {started ?
                        <Button className={styles.button} variant={"danger"} onClick={toggleStarted}>Stop</Button>
                        :
                        <Button className={styles.button} variant={"info"} onClick={toggleStarted}>Start</Button>}
                </div>

            </CardWrapper>
        </ScreenWrapper>
    );
}

export default StressTestScreen;
