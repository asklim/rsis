import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { ThemeProvider, createTheme } from '@mui/material/styles';

//import App from 'components/rsis/App/App';
import App from 'components/rsis/PublicApp/PublicApp';

import 'index.css';

// import { Debug } from 'utils/debuggers.js';
// const debug = Debug.extend( 'index' );
import { debugFactory } from 'utils/debuggers.js';
const debug = debugFactory( 'debug:index' );

console.log( '[INFO] before rendering react-app.' );

const theme = createTheme({});

const appElement = window.document.getElementById( 'react-app' );
window.document.rsis = { appVersion: appElement.innerText };
console.log( `[INFO] rsis.appVersion = ${window.document.rsis.appVersion}` );

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>,
    appElement
);

console.log( 'localStorage.debug:', localStorage.debug );
debug( 'theme', theme );
//console.log( '[DEBUG] React', React );
//console.log( '[DEBUG] React DOM', ReactDOM );
