import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
// @material-ui/icons
import Menu from "@material-ui/icons/Menu";
// core components
import AdminNavbarLinks from "./AdminNavbarLinks.js";
import RTLNavbarLinks from "./RTLNavbarLinks.js";
import Button from "../CustomButtons/Button.js";

import styles from "assets/jss/m-d-r/components/headerStyle.js";

const useStyles = makeStyles(styles);


export default function Header (props) {

    const classes = useStyles();

    function makeBrand() {

        let name;

        props.routes.map( (route) => {
            const fullroute = route.layout + '/' + route.path;
            if( window.location.href.indexOf( fullroute ) !== -1 ) {
                name = props.rtlActive ? route.rtlName : route.name;
            }
            return null;
        });
        console.log('makeBrand returns: ', name );
        return name;
    }

    const { color } = props;
    const appBarClasses = classNames({
        [" " + classes[color]]: color
    });

    return (
        <AppBar className={classes.appBar + appBarClasses}>
            <Toolbar className={classes.container}>
                <div className={classes.flex}>
                    {/* Here we create navbar brand, based on route name */}
                    <Button color="transparent" href="#" className={classes.title}>
                        {makeBrand()}
                    </Button>
                </div>
                <Hidden smDown implementation="css">
                    {props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks />}
                </Hidden>
                <Hidden mdUp implementation="css">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={props.handleDrawerToggle}
                    >
                        <Menu />
                    </IconButton>
                </Hidden>
            </Toolbar>
        </AppBar>
    );
}

Header.propTypes = {
    color: PropTypes.oneOf(["primary", "info", "success", "warning", "danger"]),
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    routes: PropTypes.arrayOf(PropTypes.object)
};
