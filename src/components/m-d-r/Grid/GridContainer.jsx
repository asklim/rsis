import * as React from "react";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";

const styles = {
    grid: {
        margin: "0 -15px !important",
        width: "unset"
    }
};

const useStyles = makeStyles(styles);

export default function GridContainer({
    children,
    ...rest
}) {
    const classes = useStyles();

    return (
        <Grid
            container
            {...rest}
            className={classes.grid}
        >
            {children}
        </Grid>
    );
}

GridContainer.propTypes = {
    children: PropTypes.node
};
