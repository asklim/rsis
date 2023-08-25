import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Hidden from "@mui/material/Hidden";
// Google Material-UI/icons
import { Menu } from "@mui/icons-material";

// core components
import AdminNavbarLinks from "./AdminNavbarLinks.jsx";
import RTLNavbarLinks from "./RTLNavbarLinks.jsx";
import Button from "../CustomButtons/Button.jsx";

import styles from "assets/jss/m-d-r/components/headerStyle.js";

const useStyles = makeStyles( styles );


export default function Header ({
    color,
    routes,
    rtlActive,
    ...rest
}) {
    const classes = useStyles();
    const location = useLocation();

    function getRouteTitle() {

        let name;
        routes.map( (route) => {
            const fullroute = route.layout + '/' + route.path;
            if(
                window.location.href.includes( fullroute )
            ){
                name = rtlActive ? route.rtlName : route.name;
            }
            return null;
        });
        //console.log(`getRouteTitle is ${name}`);
        return name;
    }

    const appBarClasses = classNames({
        [" " + classes[color]]: color
    });

    React.useEffect( () => {}, [ location ]);

    return (
        <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <div className={classes.flex}>
                    {/* Here we create navbar brand, based on route name */}
                    <Button
                        color="transparent"
                        href="#"
                        className={classes.title}
                    >
                        {getRouteTitle()}
                    </Button>
                </div>
                <Hidden smDown implementation="css">
                    {rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
                </Hidden>
                <Hidden mdUp implementation="css">
                    <IconButton
                        color = "inherit"
                        aria-label = "open drawer"
                        onClick = {rest.handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    color: PropTypes.oneOf([ "primary", "info", "success", "warning", "danger" ]),
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    routes: PropTypes.arrayOf( PropTypes.object )
};
