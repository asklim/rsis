import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Google Material-UI/core
import { withStyles } from "@mui/styles";
//import { blue } from '@mui/material/colors';
import {
    TextField,
    //Button,
    Fab,
    Typography
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
const defaultEmails = [
    'username@gmail.com',
    'user02@gmail.com'
];

const TodoForm = ({
    saveTodo
    /*, classes */
}) => {

    //console.log('TodoForm classes', classes );
    const fetchEmails = () => { return defaultEmails; };
    const emails = fetchEmails();

    const [ value, setValue ] = useState('');
    const [ selectedValue, setSelectedValue ] = useState( emails[0] );
    const [ open, setOpen ] = useState( false );


    const resetValue = () => setValue('');

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOnChange = event => {
        setValue( event.target.value );
    };

    const closeAccountChooserDialog = dialogValue => {
        setOpen( false );
        setSelectedValue( dialogValue );
        setValue( dialogValue );
    };

    //const classes = useStyles();
    const style = { ...styles().todosPopUp };
    //console.log('TodoForm style', style );
    const AccountChooserPopUp = withStyles(style)( SimpleDialog );

    return (
        <form onSubmit ={ (event) => {
        //console.log('onSubmit');
            event.preventDefault();
            saveTodo( value );
            resetValue();}}
        >
            <GridContainer  spacing ={8}>
                <GridItem>
                    <TextField onChange ={ handleOnChange }
                        variant ="outlined"
                        placeholder ="Add todo"
                        margin ="normal"
                        value ={value}
                    />
                </GridItem>
                { /*
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          labelText="Email address"
          id="email-address"
          formControlProps={{
            fullWidth: true
          }}
        />
      </GridItem>
        {alert('Hello from TodoForm')*/ }
                <GridItem>
                    <Fab onClick ={ handleClickOpen }
                        variant ="extended"
                        color ="secondary"
                    >
                        <Fingerprint />
                        <i className ="fa fa-cog fa-2x" />
                    </Fab>
                </GridItem>
                <GridItem>
                    <Typography variant ="caption" >
          Selected: {selectedValue}
                    </Typography>
                </GridItem>
            </GridContainer>

            { /*classes ={classes}
          selectedValue ={selectedValue}*/ }
            <AccountChooserPopUp
                open ={open}
                onClose ={closeAccountChooserDialog}
                emails ={emails}
            />

        </form>
    );
};
TodoForm.propTypes = {
    saveTodo: PropTypes.func.isRequired,
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
export default TodoForm;
