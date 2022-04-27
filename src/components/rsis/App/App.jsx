import * as React from "react";

//import { createBrowserHistory } from "history";
import {
    //Link,
    Navigate,
    Routes,
    Route
} from "react-router-dom";

import { ThemeProvider, createTheme } from '@mui/material/styles';

// core components
import Admin from "layouts/Admin.jsx";
import Invoice from "layouts/Invoice.jsx";
import RTL from "layouts/RTL.jsx";
//import ProcurementBoardPage from "views/invoice/ProcurementBoard.jsx";
import Whoops404 from "components/misc/Whoops404.jsx";


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
//import DashboardPage from "views/m-d-r/Dashboard.jsx";

const adminRoutes = admRoutes.map( (route, key) => {
    return route.layout === "/admin"
        && (<Route
            path = {route.path}
            element = {<route.component />}
            key = {key}
        />);
});


//const rootRoute = "/admin";

const App = () => <Routes>

    <Route path="/admin" element={<Admin />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        {adminRoutes}
        <Route path="*" element={<Whoops404 />} />
    </Route>

    <Route path="/invoice" element={<Invoice />}>
        <Route index element={<Navigate to="procurement" replace />} />
        {invoiceRoutes}
        <Route path="*" element={<Whoops404 />} />
    </Route>

    <Route path="/rtl/*" element={<RTL />} />

    <Route path="/i/*" element={<Navigate to="../invoice" />} />

    <Route path="*" element={<Whoops404 />} />

</Routes>;


const theme = createTheme({});

const AppWithTheme = () =>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
;

export default AppWithTheme;
