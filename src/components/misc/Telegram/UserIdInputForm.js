import React, { useState } from 'react';
import PropTypes from 'prop-types';

// @material-ui/core
import { withStyles } from "@material-ui/core/styles";
//import blue from '@material-ui/core/colors/blue';
import TextField from '@material-ui/core/TextField';
//import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import Fingerprint from '@material-ui/icons/Fingerprint';
//import Typography from '@material-ui/core/Typography';

//import CustomInput from 'components/m-d-r/CustomInput/CustomInput.js';
import GridContainer from 'components/m-d-r/Grid/GridContainer.js';
import GridItem from 'components/m-d-r/Grid/GridItem.js';

import SimpleDialog from 'components/misc/SimpleDialog/SimpleDialog.js';
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
  '@AndreiKlim', '381573348', '375295228222='
];

const UserIdInputForm 
= ({ makeSave /*, classes */ }) => 
{
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
