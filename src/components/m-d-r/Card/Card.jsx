import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";

import styles from "assets/jss/m-d-r/components/cardStyle.js";

const useStyles = makeStyles(styles);

export default function Card({
    className,
    children,
    plain,
    profile,
    chart,
    ...rest
}) {
    const classes = useStyles();
    const cardClasses = classNames({
        [classes.card]: true,
        [classes.cardPlain]: plain,
        [classes.cardProfile]: profile,
        [classes.cardChart]: chart,
        [className]: className !== undefined
    });
    return (
        <div className={cardClasses} {...rest}>
            {children}
        </div>
    );
}

Card.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    chart: PropTypes.bool,
};
