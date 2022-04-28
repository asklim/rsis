import * as React from 'react';
import PropTypes from 'prop-types';
/*
import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    IconButton,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
*/

import Card from "components/m-d-r/Card/Card.jsx";
import CardHeader from "components/m-d-r/Card/CardHeader.jsx";
import CardBody from "components/m-d-r/Card/CardBody.jsx";


const InfoPanel = ({
    title ='Info panel',
    info,
    classes
}) => (
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
