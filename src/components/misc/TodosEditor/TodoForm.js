import React, { useState } from 'react';
import PropTypes from 'prop-types';

// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import blue from '@material-ui/core/colors/blue';
import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Fingerprint from '@material-ui/icons/Fingerprint';
import Typography from '@material-ui/core/Typography';

//import CustomInput from 'components/m-d-r/CustomInput/CustomInput.js';
import GridContainer from 'components/m-d-r/Grid/GridContainer.js';
import GridItem from 'components/m-d-r/Grid/GridItem.js';
import AccountChoicePopUp from 'components/misc/SimpleDialog/SimpleDialog.js';

const accountPopUpStyle = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
};
const useStyles = makeStyles( accountPopUpStyle );

const defaultEmails = ['username@gmail.com', 'user02@gmail.com'];

const TodoForm = ({ saveTodo }) => 
{
  const fetchEmails = () => { return defaultEmails; };
  const emails = fetchEmails();

  const [ value, setValue ] = useState( '' );
  const [ selectedValue, setSelectedValue ] = useState( emails[1] );
  const [ open, setOpen ] = useState( false );


  const resetValue = () => setValue( '' );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleOnChange = event => {
    setValue( event.target.value );
  };

  const handleDialogClose = dialogValue => {
    setOpen( false );
    setSelectedValue( dialogValue );
    setValue( dialogValue );
  };
  const classes = useStyles(); 

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
          variant ="contained" 
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
          
        <AccountChoicePopUp open ={open} onClose ={handleDialogClose}     classes ={classes}
          selectedValue ={selectedValue} 
          emails ={emails}
        />

    </form>
  );
};
TodoForm.propTypes = {
  saveTodo: PropTypes.func.isRequired
};

export default TodoForm;
