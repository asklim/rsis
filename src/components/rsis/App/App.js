
//import { createBrowserHistory } from "history";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import React from "react";

// core components
import Admin from "layouts/Admin.js";
import Invoice from "layouts/Invoice.js";
import RTL from "layouts/RTL.js";
import ProcurementBoardPage from "views/ProcurementBoard.js";
import Whoops404 from "components/misc/Whoops404.js";

//import Whoops404 from "components/misc/Whoops404.js";

import "index.css";

//import "assets/css/material-dashboard-react.css?v=1.8.0";

//const browserHistory = createBrowserHistory();

//console.log('running ReactApp');

const App = () =>

    <BrowserRouter>
        <Routes>
            <Route path="/*" element={<Admin />} />

            <Route path="/admin/*" element={<Admin />} />

            <Route path="/invoice/*" element={<Invoice />} />

            <Route path="/rtl/*" element={<RTL />} />

            <Route path="/i" element={<ProcurementBoardPage />} />
            <Route path="*" element={<Whoops404 />} />
        </Routes>
    </BrowserRouter>
;

export default App;
