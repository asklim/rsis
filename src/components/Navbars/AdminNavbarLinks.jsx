import * as React from "react";
import classNames from "classnames";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import {
    ClickAwayListener,
    Divider,
    Grow,
    Hidden,
    MenuItem,
    MenuList,
    Paper,
    Popper,
} from "@mui/material";
// Google Material-UI/icons
import {
    Dashboard,
    Notifications,
    Person,
    Search,
} from "@mui/icons-material";
// core components
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import styles from "assets/jss/m-d-r/components/headerLinksStyle.js";

const useStyles = makeStyles( styles );
const MD_BREAKPOINT = 960-1; // theme.breakpoints.md


export default function AdminNavbarLinks() {


    const [openNotification, setOpenNotification] = React.useState( null );
    const [openProfile, setOpenProfile] = React.useState( null );

    const handleClickNotification = (event) =>
        openNotification?.contains?.( event.target ) ?
            setOpenNotification( null )
            : setOpenNotification( event.currentTarget )
    ;

    const handleCloseNotification = () => setOpenNotification( null );


    const handleClickProfile = (event) =>
        openProfile?.contains?.( event.target ) ?
            setOpenProfile( null )
            : setOpenProfile( event.currentTarget )
    ;

    const handleCloseProfile = () => setOpenProfile( null );

    const classes = useStyles();

    return (<>
        <div className={classes.searchWrapper}>
            <CustomInput
                formControlProps={{
                    className: classes.margin + " " + classes.search
                }}
                inputProps={{
                    placeholder: "Search",
                    inputProps: {
                        "aria-label": "Search"
                    }
                }}
            />
            <Button color="white" aria-label="edit" justIcon round>
                <Search />
            </Button>
        </div>

        <Button
            color ={window.innerWidth > MD_BREAKPOINT ? "transparent" : "white"}
            justIcon ={window.innerWidth > MD_BREAKPOINT}
            simple ={!(window.innerWidth > MD_BREAKPOINT)}
            aria-label ="Dashboard"
            className ={classes.buttonLink}
        >
            <Dashboard className={classes.icons} />
            <Hidden mdUp implementation="css">
                <p className={classes.linkText}>Dashboard</p>
            </Hidden>
        </Button>

        <div className={classes.manager}>
            <Button
                color ={window.innerWidth > MD_BREAKPOINT ? "transparent" : "white"}
                justIcon ={window.innerWidth > MD_BREAKPOINT}
                simple ={!(window.innerWidth > MD_BREAKPOINT)}
                aria-owns ={openNotification ? "notification-menu-list-grow" : null}
                aria-haspopup ="true"
                onClick ={handleClickNotification}
                className ={classes.buttonLink}
            >
                <Notifications className={classes.icons} />
                <span className={classes.notifications}>5</span>
                <Hidden mdUp implementation="css">
                    <p onClick={handleCloseNotification}
                        className={classes.linkText}
                    > Notification
                    </p>
                </Hidden>
            </Button>

            <Popper
                open ={Boolean(openNotification)}
                anchorEl ={openNotification}
                transition
                disablePortal
                className ={
                    classNames({ [classes.popperClose]: !openNotification }) +
                    " " + classes.popperNav
                }
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id ="notification-menu-list-grow"
                        style ={{
                            transformOrigin: placement === "bottom" ?
                                "center top"
                                : "center bottom"
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleCloseNotification}>
                                <MenuList role="menu">
                                    <MenuItem
                                        onClick ={handleCloseNotification}
                                        className ={classes.dropdownItem}
                                    > Mike John responded to your email
                                    </MenuItem>

                                    <MenuItem
                                        onClick ={handleCloseNotification}
                                        className ={classes.dropdownItem}
                                    > You have 5 new tasks
                                    </MenuItem>

                                    <MenuItem
                                        onClick ={handleCloseNotification}
                                        className ={classes.dropdownItem}
                                    > You{"'"}re now friend with Andrew
                                    </MenuItem>

                                    <MenuItem
                                        onClick ={handleCloseNotification}
                                        className ={classes.dropdownItem}
                                    > Another Notification
                                    </MenuItem>

                                    <MenuItem
                                        onClick ={handleCloseNotification}
                                        className ={classes.dropdownItem}
                                    > Another One
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>

        <div className={classes.manager}>
            <Button
                color ={window.innerWidth > MD_BREAKPOINT ? "transparent" : "white"}
                justIcon ={window.innerWidth > MD_BREAKPOINT}
                simple ={!(window.innerWidth > MD_BREAKPOINT)}
                aria-owns ={openProfile ? "profile-menu-list-grow" : null}
                aria-haspopup ="true"
                onClick ={handleClickProfile}
                className ={classes.buttonLink}
            >
                <Person className={classes.icons} />
                <Hidden mdUp implementation="css">
                    <p className={classes.linkText}>Profile</p>
                </Hidden>
            </Button>

            <Popper
                open ={Boolean(openProfile)}
                anchorEl ={openProfile}
                transition
                disablePortal
                className={
                    classNames({ [classes.popperClose]: !openProfile }) +
                    " " + classes.popperNav
                }
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id ="profile-menu-list-grow"
                        style ={{ transformOrigin: placement === "bottom" ?
                            "center top"
                            : "center bottom"
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleCloseProfile}>
                                <MenuList role="menu">
                                    <MenuItem
                                        onClick ={handleCloseProfile}
                                        className ={classes.dropdownItem}
                                    > Profile
                                    </MenuItem>

                                    <MenuItem
                                        onClick ={handleCloseProfile}
                                        className ={classes.dropdownItem}
                                    > Settings
                                    </MenuItem>

                                    <Divider light />

                                    <MenuItem
                                        onClick={handleCloseProfile}
                                        className={classes.dropdownItem}
                                    > Logout
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
    </>);
}
