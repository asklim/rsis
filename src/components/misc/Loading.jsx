import React from "react";

// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import SnackbarContent from "components/Snackbar/SnackbarContent.jsx";

// @material-ui/icons
import AddAlert from "@material-ui/icons/AddAlert";

function Loading() 
{
  //const { classes } = props;
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8} lg={4}>
      <SnackbarContent
        message = {
          'Loading ... wait please ...'
        }
        color="info"
        icon={AddAlert}
      />
      </GridItem>
    </GridContainer>
  );
}

export default Loading;