import * as React from "react";
import classNames from "classnames";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";

import styles from "assets/jss/m-d-r/components/cardAvatarStyle.js";

const useStyles = makeStyles(styles);

export default function CardAvatar({
    children,
    className,
    plain,
    profile,
    ...rest
}) {
    const classes = useStyles();
    const cardAvatarClasses = classNames({
        [classes.cardAvatar]: true,
        [classes.cardAvatarProfile]: profile,
        [classes.cardAvatarPlain]: plain,
        [className]: className !== undefined
    });
    return (
        <div className={cardAvatarClasses} {...rest}>
            {children}
        </div>
    );
}

CardAvatar.propTypes = {
    children: PropTypes.node.isRequired,
    className: PropTypes.string,
    plain: PropTypes.bool,
    profile: PropTypes.bool,
};
