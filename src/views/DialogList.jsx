/* eslint-disable react/prop-types */
import React  from "react";

// @material-ui/core components
//import withStyles from "@material-ui/core/styles/withStyles";
import { makeStyles } from "@material-ui/core/styles";

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
*/

import SimpleDialogDemoCC from "components/misc/SimpleDialog/SimpleDialogDemo.CC.jsx";
import SimpleDialogDemoRFC from "components/misc/SimpleDialog/SimpleDialogDemo.jsx";
import TodosEditor from "components/misc/TodosEditor/TodosEditor.jsx";
import AlertDialog from "components/misc/AlertDialog/AlertDialog";

import dashboard from "assets/jss/m-d-r/views/dashboardStyle.js";

const styles = {
  cardCategoryWhite: {
    ... dashboard.cardCategoryWhite,
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    ... dashboard.cardTitleWhite,
    "& small": {
      ... dashboard.cardTitleWhite["& small"],
      fontSize: "65%"
    }
  }
};

//console.log('DialogList styles ', styles);
const useStyles = makeStyles( styles );



export default function DialogList() 
{
  const classes = useStyles();

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

      <GridItem xs={12} sm={12} md={10} lg={8} xl={6}>
        <Card>
          <CardHeader color="rose">
            <h4 className={classes.cardTitleWhite}>Todo List</h4>
            <p className={classes.cardCategoryWhite}>
              Simple sample for todos (input, check/uncheck, delete)
            </p>
          </CardHeader>

          <CardBody>
            <TodosEditor />
          </CardBody>

        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={8} lg={6}>
        <Card>
          <CardHeader color="warning">
            <h4 className={classes.cardTitleWhite}>Alert Dialog</h4>
            <p className={classes.cardCategoryWhite}>
              Simple Alert dialog w/Hooks
            </p>
          </CardHeader>

          <CardBody>
            <AlertDialog />
          </CardBody>

        </Card>
      </GridItem>

      <GridItem xs={12} sm={12} md={10} lg={8}>
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
