import * as React from "react";
//import PropTypes from 'prop-types';
import { useLocation } from "react-router-dom";

// core components
import GridItem from "components/m-d-r/Grid/GridItem.jsx";
import GridContainer from "components/m-d-r/Grid/GridContainer.jsx";
import SnackbarContent from "components/m-d-r/Snackbar/SnackbarContent.jsx";

// Google Material-UI/icons
import AddAlert from "@mui/icons-material/AddAlert";

const Whoops404 = () => {
    const location = useLocation();
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

export default Whoops404;
