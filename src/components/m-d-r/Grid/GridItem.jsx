import * as React from "react";
import PropTypes from "prop-types";

// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import Grid from "@mui/material/Grid";

const styles = {
    grid: {
        padding: "0 15px !important"
    }
};

const useStyles = makeStyles(styles);


export default function GridItem ({
    children,
    ...rest
}) {
    const classes = useStyles();

    return (
        <Grid
            item
            {...rest}
            className={classes.grid}
        >
            {children}
        </Grid>
    );
}

GridItem.propTypes = {
    children: PropTypes.node
};
