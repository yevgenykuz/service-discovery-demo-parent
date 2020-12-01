import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter} from "react-router-dom"
import {RecoilRoot} from "recoil";
import LogsLoader from "./components/logic/logsLoader";

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <BrowserRouter>
                <LogsLoader/>
                <App/>
            </BrowserRouter>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);
