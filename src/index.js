//import "react-hot-loader";

import React from "react";
import ReactDOM from "react-dom";

import App from 'components/rsis/App/App';


import "assets/css/material-dashboard-react.css"; //?v=1.8.0";
import "assets/css/fixed-plugin.css";

//console.log( 'running ReactApp' );

console.log( "I: before rendering react-app." );

ReactDOM.render( 
    <App />,
    document.getElementById( "react-app" )
);

//console.log( React );
console.log( ReactDOM );
