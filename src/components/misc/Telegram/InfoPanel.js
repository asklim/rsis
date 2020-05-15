import React from 'react';
import PropTypes from 'prop-types';
/*
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
*/

import Card from "components/m-d-r/Card/Card.js";
import CardHeader from "components/m-d-r/Card/CardHeader.js";
import CardBody from "components/m-d-r/Card/CardBody.js";


const InfoPanel = ({ title ='Info panel', info, classes }) => (

    <Card>

        <CardHeader color="primary">
            <h4 className ={classes.cardTitleWhite}>{title}</h4>
        </CardHeader>

        <CardBody>
            <div className ={classes.typo}>
                <h5>{JSON.stringify( info )}</h5>
            </div>
        </CardBody>

    </Card>
);


InfoPanel.propTypes = {  

    title:   PropTypes.string,
    info:    PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};

export default InfoPanel;
