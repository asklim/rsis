import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";

import styles from "assets/jss/m-d-r/components/cardFooterStyle.js";

const useStyles = makeStyles(styles);

export default function CardFooter({
    className,
    children,
    plain,
    profile,
    stats,
    chart,
    ...rest
}) {
    const classes = useStyles();
    const cardFooterClasses = classNames({
        [classes.cardFooter]: true,
        [classes.cardFooterPlain]: plain,
        [classes.cardFooterProfile]: profile,
        [classes.cardFooterStats]: stats,
        [classes.cardFooterChart]: chart,
        [className]: className !== undefined
    });
    return (
        <div className={cardFooterClasses} {...rest}>
            {children}
        </div>
    );
}

CardFooter.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
    stats: PropTypes.bool,
    chart: PropTypes.bool,
};
