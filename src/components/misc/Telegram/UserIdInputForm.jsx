import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Google Material-UI/core
import { withStyles } from "@mui/styles";
//import blue from '@mui/material/colors/blue'; // ?? from v4
import {
    TextField,
    //Button,
    Fab,
    //Typography
} from '@mui/material';

import Fingerprint from '@mui/icons-material/Fingerprint';

//import CustomInput from 'components/m-d-r/CustomInput/CustomInput.jsx';
import GridContainer from 'components/m-d-r/Grid/GridContainer.jsx';
import GridItem from 'components/m-d-r/Grid/GridItem.jsx';

import SimpleDialog from 'components/misc/SimpleDialog/SimpleDialog.jsx';
import styles from "assets/jss/misc/todosInputListStyle.js";

/*const accountChooserPopUpStyle = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};
const useStyles = makeStyles( accountChooserPopUpStyle );
*/
const defaultUserIds = [
    '250693603im', '381573348ak', '@asbbroker'
];

const UserIdInputForm = ({
    makeSave
    /*, classes */
}) => {
    const fetchAccountIds = () => { return defaultUserIds; };
    const accountIds = fetchAccountIds();

    const [ value, setValue ] = useState( '' );
    const [ open, setOpen ] = useState( false );


    //const resetValue = () => setValue( '' );

    const handleClickOpen = () => {
        setOpen( true );
    };

    const handleOnChange = event => {
        setValue( event.target.value );
    };

    const closeAccountChooserDialog = dialogValue => {
        setOpen( false );
        setValue( dialogValue );
    };

    //const classes = useStyles();
    const style = { ...styles().todosPopUp };
    //console.log( 'TodoForm style', style );
    const AccountChooserPopUp = withStyles(style)( SimpleDialog );

    return (
        <form onSubmit ={ (event) => {
        //console.log('onSubmit');
            event.preventDefault();
            makeSave( value );
        /*resetValue();*/}}
        >
            <GridContainer  spacing ={8}>
                <GridItem>
                    <TextField onChange ={ handleOnChange }
                        variant ="outlined"
                        placeholder ="input user Id"
                        margin ="normal"
                        value ={value}
                    />
                </GridItem>
                <GridItem>
                    <Fab onClick ={ handleClickOpen }
                        variant ="extended"
                        color ="secondary"
                    >
                        <Fingerprint />
                    </Fab>
                </GridItem>
            </GridContainer>

            <AccountChooserPopUp
                open ={open}
                onClose ={closeAccountChooserDialog}
                emails ={accountIds}
            />

        </form>
    );
};
UserIdInputForm.propTypes = {
    makeSave: PropTypes.func.isRequired,
    classes: PropTypes.object,
};
/*
TodoForm.defaultProps = {
  classes: {
    avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  }},
};*/
export default UserIdInputForm;
