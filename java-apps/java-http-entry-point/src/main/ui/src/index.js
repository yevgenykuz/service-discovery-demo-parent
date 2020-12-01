import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserRouter, HashRouter} from "react-router-dom"
import {RecoilRoot} from "recoil";
import LogsManager from "./components/logic/logsManager";

ReactDOM.render(
    <React.StrictMode>
        <RecoilRoot>
            <HashRouter>
                <LogsManager/>
                <App/>
            </HashRouter>
        </RecoilRoot>
    </React.StrictMode>,
    document.getElementById('root')
);
