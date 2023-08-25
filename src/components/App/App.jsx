import * as React from 'react';

import { debugFactory } from 'utils/debuggers.js';
const debug = debugFactory('debug:app');

import {
    Navigate,
    Routes,
    Route
} from 'react-router-dom';

import {
    ThemeProvider,
    alpha,
    createTheme
} from '@mui/material/styles';

// core components
import Admin from "layouts/Admin.jsx";
import Invoice from "layouts/Invoice.jsx";
import RTL from "layouts/RTL.jsx";
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
const adminRoutes = admRoutes.map( (route, key) => {
    return route.layout === "/admin" &&
        (<Route
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

// import {
//     primaryColor,
//     infoColor,
//     successColor,
//     warningColor,
//     dangerColor,
//     roseColor,
//     blackColor,
// } from "assets/jss/m-d-r/material-dashboard-react.js";

import { default as ctmdrTheme } from './ctmdr-theme.js';
const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 600,
            md: 960,
            lg: 1200,
            xl: 1536,
        },
    },
    palette: {
        background: {
            body: 'hsla( 45, 100%, 88%, 0.6 )',
            body2: alpha('hsl( 45, 100%, 88% )', 1 ),
        },
    },
    ctmdr: ctmdrTheme,
});

const AppWithTheme = () =>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
;

debug('rsis theme', theme );

export default AppWithTheme;
