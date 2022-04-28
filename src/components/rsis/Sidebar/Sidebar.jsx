import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { NavLink, useLocation } from "react-router-dom";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import {
    Drawer,
    Hidden,
    Icon,
    List,
    ListItem,
    ListItemText
} from "@mui/material";

// core components
import AdminNavbarLinks from "components/m-d-r/Navbars/AdminNavbarLinks.jsx";
import RTLNavbarLinks from "components/m-d-r/Navbars/RTLNavbarLinks.jsx";

import styles from "./sidebarStyle.js";

const useStyles = makeStyles( styles );


export default function Sidebar ({
    color,
    logo,
    logoText,
    image,
    routes,
    rtlActive,
    ...rest
}) {
    const classes = useStyles();
    const location = useLocation();

    // verifies if routeName is the one active (in browser input)
    function isActiveRoute (routeName) {
        return window.location.href.includes( routeName );
    }

    const links = <List className={classes.list}>

        {routes.map( (route, key) => {

            let activePro = " ";
            let listItemClasses;
            const fullroute = route.layout + '/' + route.path;

            if( ["upgrade-to-pro", "uis-dash"].includes( route.path )) {
                activePro = classes.activePro + " ";
                listItemClasses = classNames({
                    [" "+classes[color]]: true
                });
            }
            else {
                listItemClasses = classNames({
                    [" "+classes[color]]: isActiveRoute( fullroute )
                });
            }

            const whiteFontClasses = classNames({
                [" "+classes.whiteFont]: isActiveRoute( fullroute )
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
                                        [classes.itemIconRTL]: rtlActive
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
                                        [classes.itemIconRTL]: rtlActive
                                    }
                                )}
                            />
                        )}
                        <ListItemText
                            primary = { rtlActive ? route.rtlName : route.name }
                            className = { classNames(
                                classes.itemText,
                                whiteFontClasses,
                                {
                                    [classes.itemTextRTL]: rtlActive
                                }
                            )}
                            disableTypography = { true }
                        />
                    </ListItem>
                </NavLink>
            );
        })}
    </List>;

    var brandLogo = (
        <div className={ classes.logo }>
            <a
                href = { window.location.origin }
                className = { classNames( classes.logoLink,
                    {
                        [classes.logoLinkRTL]: rtlActive
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

    // Чтобы обновлялись нажатые кнопки.
    React.useEffect( () => {
        //console.log( location );
    }, [ location ]);

    return (<>
        <Hidden mdUp implementation="css">
            <Drawer
                variant = "temporary"
                anchor = { rtlActive ? "left" : "right" }
                open = { rest.open }
                classes = {{
                    paper: classNames(
                        classes.drawerPaper,
                        {
                            [classes.drawerPaperRTL]: rtlActive
                        }
                    )
                }}
                onClose = { rest.handleDrawerToggle }
                ModalProps = {{
                    keepMounted: true // Better open performance on mobile.
                }}
            >
                { brandLogo }
                <div className = { classes.sidebarWrapper }>
                    { rtlActive ? <RTLNavbarLinks /> : <AdminNavbarLinks /> }
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
                anchor = { rtlActive ? "right" : "left" }
                variant = "permanent"
                open
                classes = {{
                    paper: classNames(
                        classes.drawerPaper,
                        {
                            [classes.drawerPaperRTL]: rtlActive
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
    color: PropTypes.oneOf(["purple", "blue", "green", "orange", "red"]),
    handleDrawerToggle: PropTypes.func,
    image: PropTypes.string,
    logo: PropTypes.string,
    logoText: PropTypes.string,
    open: PropTypes.bool,
    routes: PropTypes.arrayOf(PropTypes.object),
    rtlActive: PropTypes.bool,
};
