import { hot } from 'react-hot-loader';
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import React from "react";

// core components
import Admin from "layouts/Admin.jsx";
import Invoice from "layouts/Invoice.jsx";
import RTL from "layouts/RTL.jsx";
//import Whoops404 from "components/misc/Whoops404.jsx";

import "assets/css/material-dashboard-react.css?v=1.8.0";

const hist = createBrowserHistory();

//console.log('running ReactApp');
const App = () =>
  <Router history={hist}>
  <Switch>
    <Route path="/admin" component={Admin} />
    <Route path="/invoice" component={Invoice} />       
    <Route path="/rtl" component={RTL} />       
    
    <Redirect from="/i" to="/invoice/dashboard" />
    <Redirect from="/" to="/admin/dashboard" />     

    {/*<Route component={Whoops404} />*/}
  </Switch>
  </Router>
;

export default hot(module)( App );
