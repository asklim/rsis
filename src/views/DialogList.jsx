/* eslint-disable react/prop-types */

import React /*, { useState }*/ from "react";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridItem from "components/m-d-r/Grid/GridItem.jsx";
import GridContainer from "components/m-d-r/Grid/GridContainer.jsx";
import Table from "components/m-d-r/Table/Table.jsx";
import Card from "components/m-d-r/Card/Card.jsx";
import CardHeader from "components/m-d-r/Card/CardHeader.jsx";
import CardBody from "components/m-d-r/Card/CardBody.jsx";
//import Fingerprint from '@material-ui/icons/Fingerprint';

/*
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
*/

import SimpleDialogDemoCC from "components/misc/SimpleDialog/SimpleDialogDemo.CC.jsx";
import SimpleDialogDemoRFC from "components/misc/SimpleDialog/SimpleDialogDemo.jsx";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


//const defaultEmails = ['username@gmail.com', 'user02@gmail.com'];

function DialogList(props) 
{
  const { classes } = props;

  return (
    <GridContainer>

      <GridItem xs={12} sm={8} md={6}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Simple Dialog Demo</h4>
            <p className={classes.cardCategoryWhite}>
              Simple dialog w/React Class Component.
            </p>
          </CardHeader>
          <CardBody>
            <SimpleDialogDemoCC />
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={8} md={6}>
        <Card>
          <CardHeader color="rose">
            <h4 className={classes.cardTitleWhite}>Simple Dialog Demo</h4>
            <p className={classes.cardCategoryWhite}
              >Simple dialog w/React Functional Component (Hooks)
            </p>
          </CardHeader>
          <CardBody>
            <SimpleDialogDemoRFC />
          </CardBody>
        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={12}>
        <Card>
          <CardHeader color="primary">
            <h4 className={classes.cardTitleWhite}>Simple Table</h4>
            <p className={classes.cardCategoryWhite}>
              Here is a subtitle for this table
            </p>
          </CardHeader>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={["Name", "Country", "City", "Salary"]}
              tableData={[
                ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"],
                ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"],
                ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"],
                ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"],
                ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"],
                ["Mason Porter", "Chile", "Gloucester", "$78,615"]
              ]}
            />
          </CardBody>
        </Card>
      </GridItem>

    </GridContainer>
  );
}

export default withStyles(styles)(DialogList);
