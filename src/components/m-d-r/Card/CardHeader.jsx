import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";

import styles from "assets/jss/m-d-r/components/cardHeaderStyle.js";

const useStyles = makeStyles(styles);

export default function CardHeader({
    className,
    children,
    color,
    plain,
    stats,
    icon,
    ...rest
}) {
    const classes = useStyles();
    const cardHeaderClasses = classNames({
        [classes.cardHeader]: true,
        [classes[color + "CardHeader"]]: color,
        [classes.cardHeaderPlain]: plain,
        [classes.cardHeaderStats]: stats,
        [classes.cardHeaderIcon]: icon,
        [className]: className !== undefined
    });
    return (
        <div className={cardHeaderClasses} {...rest}>
            {children}
        </div>
    );
}

CardHeader.propTypes = {
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
    plain: PropTypes.bool,
    stats: PropTypes.bool,
    icon: PropTypes.bool,
};
