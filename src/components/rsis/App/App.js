import * as React from "react";

//import { createBrowserHistory } from "history";
import {
    BrowserRouter,
    Navigate,
    Routes,
    Route
} from "react-router-dom";

// core components
import Admin from "layouts/Admin.js";
import Invoice from "layouts/Invoice.js";
import RTL from "layouts/RTL.js";
import ProcurementBoardPage from "views/ProcurementBoard.js";
import Whoops404 from "components/misc/Whoops404.js";

//import Whoops404 from "components/misc/Whoops404.js";

//const browserHistory = createBrowserHistory();

//console.log('running ReactApp');

import invRoutes from "layouts/invoice-routes.js";

const invoiceRoutes = invRoutes.map( (route, key) => {
    if(
        route.layout === "/invoice"
    ){
        return (
            <Route
                path = {route.path}
                element = {<route.component />}
                key = {key}
            />
        );
    }
});


import admRoutes from "layouts/admin-routes.js";
import DashboardPage from "views/m-d-r/Dashboard.js";

const adminRoutes = admRoutes.map( (route, key) => {
    return route.layout === "/admin"
        && (<Route
            path = {route.path}
            element = {<route.component />}
            key = {key}
        />);
});


const App = () =>

    <BrowserRouter>
        <Routes>

            <Route path="/admin" element={<Admin />}>
                <Route index element={<DashboardPage />} />
                {adminRoutes}
                <Route path="*" element={<Whoops404 />} />
            </Route>

            <Route path="/invoice" element={<Invoice />}>
                <Route index element={<ProcurementBoardPage />} />
                {invoiceRoutes}
                <Route path="*" element={<Whoops404 />} />
            </Route>

            <Route path="/rtl/*" element={<RTL />} />

            <Route path="/i/*" element={<ProcurementBoardPage />} />

            <Route index element={<Navigate to="admin/dashboard" replace={true} />} />

            <Route path="*" element={<Whoops404 />} />
        </Routes>
    </BrowserRouter>
;

export default App;

//<Route path="/admin/*" element={<Admin />} />
