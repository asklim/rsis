import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";

import styles from "assets/jss/m-d-r/components/cardBodyStyle.js";

const useStyles = makeStyles(styles);

export default function CardBody({
    className,
    children,
    plain,
    profile,
    ...rest
}) {
    const classes = useStyles();
    const cardBodyClasses = classNames({
        [classes.cardBody]: true,
        [classes.cardBodyPlain]: plain,
        [classes.cardBodyProfile]: profile,
        [className]: className !== undefined
    });
    return (
        <div className={cardBodyClasses} {...rest}>
            {children}
        </div>
    );
}

CardBody.propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
};
