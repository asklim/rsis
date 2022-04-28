import * as React from "react";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";

// core components
import styles from "assets/jss/m-d-r/components/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function Warning ({ children }) {

    const classes = useStyles();

    return (
        <div
            className={classes.defaultFontStyle + " " + classes.warningText}
        >
            {children}
        </div>
    );
}

Warning.propTypes = {
    children: PropTypes.node
};
