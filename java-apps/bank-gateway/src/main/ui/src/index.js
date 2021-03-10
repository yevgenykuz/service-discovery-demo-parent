import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {HashRouter} from "react-router-dom"
import {RecoilRoot} from "recoil";
import LogsManager from "./components/logic/logsManager";

ReactDOM.render(
    <RecoilRoot>
        <HashRouter>
            <LogsManager/>
            <App/>
        </HashRouter>
    </RecoilRoot>
    ,
    document.getElementById('root')
);
