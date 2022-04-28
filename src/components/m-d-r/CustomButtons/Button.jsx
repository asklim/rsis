import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// material-ui components
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";

import styles from "assets/jss/m-d-r/components/buttonStyle.js";

const useStyles = makeStyles( styles );

export default function RegularButton ({
    color,
    round,
    children,
    disabled,
    simple,
    size,
    block,
    link,
    justIcon,
    className,
    muiClasses,
    ...rest
}) {
    const classes = useStyles();

    const btnClasses = classNames({
        [classes.button]: true,
        [classes[size]]: size,
        [classes[color]]: color,
        [classes.round]: round,
        [classes.disabled]: disabled,
        [classes.simple]: simple,
        [classes.block]: block,
        [classes.link]: link,
        [classes.justIcon]: justIcon,
        [className]: className
    });

    return (
        <Button
            {...rest}
            classes={muiClasses}
            className={btnClasses}
        >
            {children}
        </Button>
    );
}

RegularButton.propTypes = {
    block: PropTypes.bool,
    children: PropTypes.node,
    className: PropTypes.string,
    color: PropTypes.oneOf([
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "rose",
        "white",
        "transparent"
    ]),
    disabled: PropTypes.bool,
    justIcon: PropTypes.bool,
    link: PropTypes.bool,
    round: PropTypes.bool,
    size: PropTypes.oneOf([ "sm", "lg" ]),
    simple: PropTypes.bool,
    // use this to pass the classes props from Material-UI
    muiClasses: PropTypes.object,
};
