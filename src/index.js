//import "react-hot-loader";

import * as React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles';

//import App from 'components/rsis/App/App';
import App from 'components/rsis/PublicApp/PublicApp';

import "index.css";

//console.log( 'running ReactApp' );

console.log( "[INFO] before rendering react-app." );

const theme = createTheme({});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </ThemeProvider>,
    document.getElementById( "react-app" )
);

//console.log( React );
localStorage.debug = 'invoice:*';
console.log( "[INFO] theme", theme /*ReactDOM*/ );
