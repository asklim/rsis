import React from "react";
//import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";

// core components
import GridItem from "components/m-d-r/Grid/GridItem.js";
import GridContainer from "components/m-d-r/Grid/GridContainer.js";
import SnackbarContent from "components/m-d-r/Snackbar/SnackbarContent.js";

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";

const Whoops404 = () => {
    const location = useLocation();
    //const { classes } = props;
    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={8} lg={4}>
                <SnackbarContent
                    message = {
                        `Resource not found at '${location.pathname}'`
                    }
                    color = "info"
                    icon = {AddAlert}
                />
            </GridItem>
        </GridContainer>
    );
};
/*Whoops404.propTypes = {
    location: PropTypes.object
};*/

export default Whoops404;