import * as React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import Snack from "@mui/material/SnackbarContent";
import IconButton from "@mui/material/IconButton";
// Google Material-UI/icons
import Close from "@mui/icons-material/Close";

// core components
import styles from "assets/jss/m-d-r/components/snackbarContentStyle.js";

const useStyles = makeStyles(styles);


export default function SnackbarContent ({
    message,
    color,
    close,
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
            >
                <Close className={cls.close} />
            </IconButton>
        ];
    }

    return (
        <Snack
            message={
                <div>
                    {rest.icon !== undefined ?
                        <rest.icon className={cls.icon} /> : null}
                    <span className={messageClasses}>{message}</span>
                </div>
            }
            classes={{
                root: cls.root + " " + cls[color],
                message: cls.message,
                action: classNames({ [cls.actionRTL]: rtlActive })
            }}
            action={action}
        />
    );
}

SnackbarContent.propTypes = {
    message: PropTypes.node.isRequired,
    color: PropTypes.oneOf(["info", "success", "warning", "danger", "primary"]),
    close: PropTypes.bool,
    icon: PropTypes.object,
    rtlActive: PropTypes.bool
};
