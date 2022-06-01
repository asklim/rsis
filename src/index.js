import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

import PublicApp from './PublicApp/PublicApp.jsx';

import 'index.css';

// import { Debug } from 'utils/debuggers.js';
// const debug = Debug.extend( 'index' );
import { debugFactory } from 'utils/debuggers.js';
const debug = debugFactory( 'debug:index' );

const appElement = window.document.getElementById( 'react-app' );
window.document.rsis = { appVersion: appElement.innerText };
console.log( `[INFO] rsis.appVersion = ${window.document.rsis.appVersion}` );
console.log( '[INFO] before rendering react-app.' );

const theme = createTheme({
    palette: {
        background: {
            body: 'hsla( 95, 100%, 88%, 0.6 )',
        },
    },});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <PublicApp />
        </BrowserRouter>
    </ThemeProvider>,
    appElement
);

console.log( 'localStorage.debug:', localStorage.debug );
debug( 'theme', theme );
//console.log( '[DEBUG] React', React );
//console.log( '[DEBUG] React DOM', ReactDOM );
