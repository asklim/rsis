/*esl-int-disable indent*/
import React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Icon from "@material-ui/core/Icon";

// core components
import AdminNavbarLinks from "components/m-d-r/Navbars/AdminNavbarLinks.js";
import RTLNavbarLinks from "components/m-d-r/Navbars/RTLNavbarLinks.js";

import styles from "./sidebarStyle.js";

const useStyles = makeStyles( styles );


export default function Sidebar (props) {

    const classes = useStyles();

    // verifies if routeName is the one active (in browser input)
    function isActiveRoute (routeName) {
        return window.location.href.includes( routeName );
    }

    const {
        color, logo,
        image, logoText,
        routes
    } = props;

    const links = (
        <List className = { classes.list }>

            {routes.map( (route, key) => {

                let activePro = " ";
                let listItemClasses;
                const fullroute = route.layout + '/' + route.path;

                if( ["upgrade-to-pro", "uis-dash"].includes( route.path )) {
                    activePro = classes.activePro + " ";
                    listItemClasses = classNames({
                        [ " "+classes[color] ]: true
                    });
                }
                else {
                    listItemClasses = classNames({
                        [ " "+classes[color] ]: isActiveRoute( fullroute )
                    });
                }

                const whiteFontClasses = classNames({
                    [ " "+classes.whiteFont ]: isActiveRoute( fullroute )
                });

                return (
                    <NavLink
                        to = { fullroute }
                        className = { activePro + classes.item }
                        /*activeClassName = "active"*/
                        key = { key }
                    >
                        <ListItem button className={ classes.itemLink + listItemClasses }>
                            {typeof route.icon === "string" ? (
                                <Icon
                                    className = { classNames(
                                        classes.itemIcon,
                                        whiteFontClasses,
                                        {
                                            [ classes.itemIconRTL ]: props.rtlActive
                                        }
                                    )}
                                >
                                    { route.icon }
                                </Icon>
                            ) : (
                                <route.icon
                                    className={classNames(
                                        classes.itemIcon,
                                        whiteFontClasses,
                                        {
                                            [ classes.itemIconRTL ]: props.rtlActive
                                        }
                                    )}
                                />
                            )}
                            <ListItemText
                                primary = { props.rtlActive ? route.rtlName : route.name }
                                className = { classNames(
                                    classes.itemText,
                                    whiteFontClasses,
                                    {
                                        [ classes.itemTextRTL ]: props.rtlActive
                                    }
                                )}
                                disableTypography = { true }
                            />
                        </ListItem>
                    </NavLink>
                );
            })}
        </List>
    );

    var brandLogo = (
        <div className={ classes.logo }>
            <a
                href = { window.location.origin }
                className = { classNames( classes.logoLink,
                    {
                        [ classes.logoLinkRTL ]: props.rtlActive
                    }
                )}
                target = ""//"_blank"
            >
                <div className={ classes.logoImage }>
                    <img src={ logo } alt="logo" className={ classes.img } />
                </div>
                { logoText }
            </a>
        </div>
    );

    return (<>
        <Hidden mdUp implementation="css">
            <Drawer
                variant = "temporary"
                anchor = { props.rtlActive ? "left" : "right" }
                open = { props.open }
                classes = {{
                    paper: classNames(
                        classes.drawerPaper,
                        {
                            [ classes.drawerPaperRTL ]: props.rtlActive
                        }
                    )
                }}
                onClose = { props.handleDrawerToggle }
                ModalProps = {{
                    keepMounted: true // Better open performance on mobile.
                }}
            >
                { brandLogo }
                <div className = { classes.sidebarWrapper }>
                    { props.rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks /> }
                    { links }
                </div>
                { image !== undefined ? (
                    <div
                        className = { classes.background }
                        style = {{ backgroundImage: "url(" + image + ")" }}
                    />)
                    : null
                }
            </Drawer>
        </Hidden>

        <Hidden smDown implementation="css">
            <Drawer
                anchor = { props.rtlActive ? "right" : "left" }
                variant = "permanent"
                open
                classes = {{
                    paper: classNames(
                        classes.drawerPaper,
                        {
                            [classes.drawerPaperRTL]: props.rtlActive
                        }
                    )
                }}
            >
                { brandLogo }
                <div className = { classes.sidebarWrapper }>
                    { links }
                </div>
                {image !== undefined
                    ? (
                        <div
                            className = { classes.background }
                            style ={{ backgroundImage: "url(" + image + ")" }}
                        />
                    )
                    : null
                }
            </Drawer>
        </Hidden>
    </>);
}

Sidebar.propTypes = {
    rtlActive: PropTypes.bool,
    handleDrawerToggle: PropTypes.func,
    color: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    logo: PropTypes.string,
    image: PropTypes.string,
    logoText: PropTypes.string,
    routes: PropTypes.arrayOf(PropTypes.object),
    open: PropTypes.bool
};
