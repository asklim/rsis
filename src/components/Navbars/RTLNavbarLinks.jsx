import * as React from "react";
import classNames from "classnames";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import {
    ClickAwayListener,
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

import styles from "assets/jss/m-d-r/components/rtlHeaderLinksStyle.js";

const useStyles = makeStyles(styles);
const MD_BREAKPOINT = 960-1; // theme.breakpoints.md


export default function RTLNavbarLinks() {


    const [open, setOpen] = React.useState( null );

    const handleToggle = (event) =>
        open?.contains?.( event.target ) ?
            setOpen( null )
            : setOpen( event.currentTarget )
    ;

    const handleClose = () => setOpen( null );

    const classes = useStyles();

    return (<>
        <div className={classes.searchWrapper}>
            <CustomInput
                formControlProps ={{
                    className: classes.margin + " " + classes.search
                }}
                inputProps ={{
                    placeholder: "جستجو...",
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
            color={window.innerWidth > MD_BREAKPOINT ? "transparent" : "white"}
            justIcon={window.innerWidth > MD_BREAKPOINT}
            simple={!(window.innerWidth > MD_BREAKPOINT)}
            aria-label="Dashboard"
            className={classes.buttonLink}
        >
            <Dashboard className={classes.icons} />
            <Hidden mdUp implementation="css">
                <p className={classes.linkText}>آمارها</p>
            </Hidden>
        </Button>

        <div className={classes.manager}>
            <Button
                color={window.innerWidth > MD_BREAKPOINT ? "transparent" : "white"}
                justIcon={window.innerWidth > MD_BREAKPOINT}
                simple={!(window.innerWidth > MD_BREAKPOINT)}
                aria-owns={open ? "menu-list-grow" : null}
                aria-haspopup="true"
                onClick={handleToggle}
                className={classes.buttonLink}
            >
                <Notifications className={classes.icons} />
                <span className={classes.notifications}>۵</span>
                <Hidden mdUp implementation="css">
                    <p onClick={handleToggle}
                        className={classes.linkText}
                    > اعلان‌ها
                    </p>
                </Hidden>
            </Button>
            <Popper
                open ={Boolean(open)}
                anchorEl ={open}
                transition
                disablePortal
                className ={
                    classNames({ [classes.popperClose]: !open }) +
                    " " + classes.popperNav
                }
            >
                {({ TransitionProps, placement }) => (
                    <Grow
                        {...TransitionProps}
                        id ="menu-list-grow"
                        style={{
                            transformOrigin: placement === "bottom" ?
                                "center top"
                                : "center bottom"
                        }}
                    >
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MenuList role="menu">
                                    <MenuItem
                                        onClick={handleClose}
                                        className={classes.dropdownItem}
                                    > محمدرضا به ایمیل شما پاسخ داد
                                    </MenuItem>

                                    <MenuItem
                                        onClick={handleClose}
                                        className={classes.dropdownItem}
                                    > شما ۵ وظیفه جدید دارید
                                    </MenuItem>

                                    <MenuItem
                                        onClick={handleClose}
                                        className={classes.dropdownItem}
                                    > از حالا شما با علیرضا دوست هستید
                                    </MenuItem>

                                    <MenuItem
                                        onClick={handleClose}
                                        className={classes.dropdownItem}
                                    > اعلان دیگر
                                    </MenuItem>

                                    <MenuItem
                                        onClick={handleClose}
                                        className={classes.dropdownItem}
                                    > اعلان دیگر
                                    </MenuItem>
                                </MenuList>
                            </ClickAwayListener>
                        </Paper>
                    </Grow>
                )}
            </Popper>
        </div>
        <Button
            color ={window.innerWidth > MD_BREAKPOINT ? "transparent" : "white"}
            justIcon ={window.innerWidth > MD_BREAKPOINT}
            simple ={!(window.innerWidth > MD_BREAKPOINT)}
            aria-label ="Person"
            className ={classes.buttonLink}
        >
            <Person className={classes.icons} />
            <Hidden mdUp implementation="css">
                <p className={classes.linkText}>حساب کاربری</p>
            </Hidden>
        </Button>
    </>);
}
