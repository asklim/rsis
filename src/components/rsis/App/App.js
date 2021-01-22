
import { createBrowserHistory } from "history";
import { Router, Route, Switch, Redirect } from "react-router-dom";

import React from "react";

// core components
import Admin from "layouts/Admin.js";
import Invoice from "layouts/Invoice.js";
import RTL from "layouts/RTL.js";
//import Whoops404 from "components/misc/Whoops404.js";

//import "assets/css/material-dashboard-react.css?v=1.8.0";

const browserHistory = createBrowserHistory();

//console.log('running ReactApp');

const App = () =>

    <Router history ={browserHistory}>
        <Switch>
            <Redirect exact from ="/" to ="/admin/dashboard" />  

            <Route path ="/admin">
                <Admin />
            </Route>

            <Route path ="/invoice">
                <Invoice />
            </Route>       
            
            <Route path ="/rtl">
                <RTL />       
            </Route>
            
            <Redirect from ="/i" to ="/invoice/dashboard" /> 
            {/*<Route component ={Whoops404} />*/}
        </Switch>
    </Router>
;

export default App;
