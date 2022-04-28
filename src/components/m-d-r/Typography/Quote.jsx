import * as React from "react";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";

// core components
import styles from "assets/jss/m-d-r/components/typographyStyle.js";

const useStyles = makeStyles(styles);

export default function Quote ({
    text,
    author
}) {
    const classes = useStyles();

    return (
        <blockquote
            className={classes.defaultFontStyle + " " + classes.quote}
        >
            <p className={classes.quoteText}>{text}</p>
            <small className={classes.quoteAuthor}>{author}</small>
        </blockquote>
    );
}

Quote.propTypes = {
    text: PropTypes.node,
    author: PropTypes.node
};
