import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import Snack from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
// Google Material-UI/icons
import Close from "@mui/icons-material/Close";

// core components
import styles from "assets/jss/m-d-r/components/snackbarContentStyle.js";

const useStyles = makeStyles(styles);

export default function Snackbar ({
    message,
    color,
    close,
    closeNotification,
    place,
    open,
    rtlActive,
    ...rest
}) {

    const cls = useStyles();
    let action = [];

    const messageClasses = classNames({
        [cls.iconMessage]: rest.icon !== undefined
    });

    if (close !== undefined) {
        action = [
            <IconButton
                className={cls.iconButton}
                key="close"
                aria-label="Close"
                color="inherit"
                onClick={() => closeNotification()}
            >
                <Close className={cls.close} />
            </IconButton>
        ];
    }

    return (
        <Snack
            anchorOrigin={{
                vertical: place.indexOf("t") === -1 ? "bottom" : "top",
                horizontal: place.indexOf("l") !== -1 ?
                    "left"
                    : place.indexOf("c") !== -1 ?
                        "center"
                        : "right"
            }}
            open={open}
            message={
                <div>
                    {rest.icon !== undefined ?
                        <rest.icon className={cls.icon} /> : null}
                    <span className={messageClasses}>{message}</span>
                </div>
            }
            action={action}
            ContentProps={{
                classes: {
                    root: cls.root + " " + cls[color],
                    message: cls.message,
                    action: classNames({ [cls.actionRTL]: rtlActive })
                }
            }}
        />
    );
}

Snackbar.propTypes = {
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
    close: PropTypes.bool,
    closeNotification: PropTypes.func,
    icon: PropTypes.object,
    open: PropTypes.bool,
    place: PropTypes.oneOf(["tl", "tr", "tc", "br", "bl", "bc"]),
    rtlActive: PropTypes.bool,
};
