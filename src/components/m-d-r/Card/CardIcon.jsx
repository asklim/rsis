import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";

import styles from "assets/jss/m-d-r/components/cardIconStyle.js";

const useStyles = makeStyles(styles);

export default function CardIcon({
    className,
    children,
    color,
    ...rest
}) {
    const classes = useStyles();
    const cardIconClasses = classNames({
        [classes.cardIcon]: true,
        [classes[color + "CardHeader"]]: color,
        [className]: className !== undefined
    });
    return (
        <div className={cardIconClasses} {...rest}>
            {children}
        </div>
    );
}

CardIcon.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    color: PropTypes.oneOf([
        "danger",
        "info",
        "primary",
        "rose",
        "success",
        "warning",
    ]),
};
