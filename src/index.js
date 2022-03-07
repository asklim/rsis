//import "react-hot-loader";

import * as React from "react";
import ReactDOM from "react-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles';

import App from 'components/rsis/App/App';

import "index.css";

//console.log( 'running ReactApp' );

console.log( "[INFO] before rendering react-app." );

const theme = createTheme({});

ReactDOM.render(
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>,
    document.getElementById( "react-app" )
);

//console.log( React );
localStorage.debug = 'invoice:*';
console.log( theme /*ReactDOM*/ );
