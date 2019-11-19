import React from "react";

// core components
import GridItem from "components/m-d-r/Grid/GridItem.js";
import GridContainer from "components/m-d-r/Grid/GridContainer.js";
import SnackbarContent from "components/m-d-r/Snackbar/SnackbarContent.js";

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";

const Loading = () => 
  <GridContainer>
    <GridItem xs={12} sm={12} md={8} lg={4}>
    <SnackbarContent
      message = {'Loading ... wait please ...'}
      color = "info"
      icon = {AddAlert}
    />
    </GridItem>
  </GridContainer>
;
export default Loading;
