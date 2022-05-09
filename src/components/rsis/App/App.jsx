import * as React from 'react';

import { debugFactory } from 'utils/debuggers.js';
const debug = debugFactory( 'debug:app' );

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

import {
    primaryColor,
    infoColor,
    successColor,
    warningColor,
    dangerColor,
    roseColor,
    blackColor,
} from "assets/jss/m-d-r/material-dashboard-react.js";


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
    ctmdr: {
        defaultFont: {
            fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
            fontWeight: "300",
            lineHeight: "1.5em",
        },
        boxShadow: {
            default:
            `0 10px 30px -12px ${alpha( blackColor, 0.42 )}` +
            `, 0 4px 25px 0px ${alpha( blackColor, 0.12 )}` +
            `, 0 8px 10px -5px ${alpha( blackColor, 0.2 )}`,
            primary:
            `0 4px 20px 0 ${alpha( "#000", .14)}, ` +
            `0 7px 10px -5px ${alpha(primaryColor[0], .4)}`,
        },
        palette: {
            danger:  dangerColor,
            info:    infoColor,
            primary: primaryColor,
            rose:    roseColor,
            success: successColor,
            warning: warningColor,
            gray: [
                "#999999", "#777777", "#3c4858", "#aaaaaa",
                "#d2d2d2", "#dddddd", "#b4b4b4", "#555555",
                "#333333", "#a9afbb", "#eeeeee", "#e7e7e7"
            ],
        },
        colorsMatrix: {
            /* key to color */
            danger:  'red',
            info:    'blue',
            primary: 'purple',
            success: 'green',
            warning: 'orange',
            /* color to key */
            'orange': 'warning',
            'blue': 'info',
            'purple': 'primary',
            'green': 'success',
            'red': 'danger',
        },
        drawerWidth: 260,
        transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)",
    }
});

const AppWithTheme = () =>
    <ThemeProvider theme={theme}>
        <App />
    </ThemeProvider>
;

debug( 'rsis theme', theme );

export default AppWithTheme;
