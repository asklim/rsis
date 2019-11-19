import React from "react";
import PropTypes from 'prop-types';

// core components
import GridItem from "components/m-d-r/Grid/GridItem.js";
import GridContainer from "components/m-d-r/Grid/GridContainer.js";
import SnackbarContent from "components/m-d-r/Snackbar/SnackbarContent.js";

// @material-ui/icons
import { ReportProblem as DataErrorIcon } from "@material-ui/icons";

const DataLoadError = ({ fetchapiResponse }) => 
{
  const { url, } = fetchapiResponse;
  let outMsg = `Data not found at '${url}'.`;
  outMsg += `Server response: ${fetchapiResponse}`;

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={8} lg={5}>
      <SnackbarContent
        message = {outMsg}
        color = "danger"
        icon = {DataErrorIcon}
      />
      </GridItem>
    </GridContainer>
  );
};
DataLoadError.propTypes = {
  fetchapiResponse : PropTypes.object
};

export default DataLoadError;