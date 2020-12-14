import React from 'react';
import ScreenWrapper from "../../components/screenWrapper";
import CardWrapper from "../../components/cardWrapper";
import {Dropdown, Form} from "react-bootstrap";
import {getAllOptions} from "../../../constants/convertCurrencyOptions";


function ConvertCurrencyScreen(props) {
    return (<ScreenWrapper className="flexCenter">
            <CardWrapper >
                <img src={"/img/exchange.svg"} alt={"deposit icon"} className={`iconMarginMedium iconMedium`}/>
                <Form>
                    <Form.Group>
                        <Form.Label>Enter the amount to convert</Form.Label>
                        <Form.Control type='number' />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>From</Form.Label>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                From
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {getAllOptions().map((currencyType)=> <Dropdown.Item key={`from_${currencyType}`} >{currencyType}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>
                    </Form.Group>
                    <Form.Group>
                        <Dropdown>
                            <Dropdown.Toggle variant="success" id="dropdown-basic">
                                To
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {getAllOptions().map((currencyType)=> <Dropdown.Item key={`from_${currencyType}`} >{currencyType}</Dropdown.Item>)}
                            </Dropdown.Menu>
                        </Dropdown>

                    </Form.Group>
                </Form>

            </CardWrapper>
        </ScreenWrapper>
    );
}

export default ConvertCurrencyScreen;
