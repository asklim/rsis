import * as React from "react";
// Google Material-UI/core components
import { makeStyles } from "@mui/styles";
import Hidden from "@mui/material/Hidden";

// core components
import GridItem from "components/m-d-r/Grid/GridItem.jsx";
import GridContainer from "components/m-d-r/Grid/GridContainer.jsx";
import Card from "components/m-d-r/Card/Card.jsx";
import CardHeader from "components/m-d-r/Card/CardHeader.jsx";
import CardBody from "components/m-d-r/Card/CardBody.jsx";

import styles from "assets/jss/m-d-r/views/iconsStyle.jsx";

const useStyles = makeStyles( styles );


export default function Icons() {

    const classes = useStyles();

    return (
        <GridContainer>
            <GridItem xs={12} sm={12} md={12}>
                <Card plain>
                    <CardHeader plain color="primary">
                        <h4 className={classes.cardTitleWhite}>Material Design Icons</h4>
                        <p className={classes.cardCategoryWhite}>
              Handcrafted by our friends from{" "}
                            <a
                                href="https://design.google.com/icons/?ref=creativetime"
                                target="_blank" rel="noreferrer"
                            >
                Google
                            </a>
                        </p>
                    </CardHeader>
                    <CardBody>
                        <Hidden only={["sm", "xs"]}>
                            <iframe
                                className={classes.iframe}
                                src="https://material.io/icons/"
                                title="Icons iframe"
                            >
                                <p>Your browser does not support iframes.</p>
                            </iframe>
                        </Hidden>
                        <Hidden only={["lg", "md"]}>
                            <GridItem xs={12} sm={12} md={6}>
                                <h5>
                  The icons are visible on Desktop mode inside an iframe. Since
                  the iframe is not working on Mobile and Tablets please visit
                  the icons on their original page on Google. Check the
                                    <a
                                        href="https://design.google.com/icons/?ref=creativetime"
                                        target="_blank" rel="noreferrer"
                                    >
                    Material Icons
                                    </a>
                                </h5>
                            </GridItem>
                        </Hidden>
                    </CardBody>
                </Card>
            </GridItem>
        </GridContainer>
    );
}
