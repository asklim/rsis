/*
import { hot } from 'react-hot-loader';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";
*/
import React from "react";
import ReactDOM from "react-dom";
import App from 'components/rsis/App';

/*
// core components
import Admin from "layouts/Admin.js";
import Invoice from "layouts/Invoice.js";
import RTL from "layouts/RTL.js";
//import Whoops404 from "components/misc/Whoops404.js";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

//console.log('running ReactApp');
const App = () => hot(module)(
  <Router history={hist}>
  <Switch>
    <Route path="/admin" component={Admin} />
    <Route path="/invoice" component={Invoice} />       
    <Route path="/rtl" component={RTL} />       
    
    <Redirect from="/i" to="/invoice/dashboard" />
    <Redirect from="/" to="/admin/dashboard" />     

    {/*<Route component={Whoops404} />}
  </Switch>
  </Router>
);
*/

ReactDOM.render( 
  <App />,
  document.getElementById( "react-app" )
);
/*
console.log(React);
console.log(ReactDOM);
*/