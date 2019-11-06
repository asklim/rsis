import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { 
  Button,
  Typography,
} from '@material-ui/core';

import SimpleDialog from './SimpleDialog.CC.jsx';
import styles from './simpleDialogStyle.js';


const emails = ['classReact@gmail.com', 'ClassRC@gmail.com'];

const SimpleDialogStyled = withStyles(styles)(SimpleDialog);

class SimpleDialogDemo extends React.Component 
{
  state = {
    open : false,
    selectedItem : emails[1],
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = value => {
    console.log('handleClose value ', value);
    //when click near a simpleDialog window, then handleClose get
    //value = null or "", then selectedItem === Class and Error !!!
    //Это был class Close event. Нужно было убрать лишние props из 
    //Dialog {children} в данном случае это была функция onClose в {...other}
    // 
    let newState = { open : false };
    //if(typeof value === 'string') {
    if(value) {
      newState.selectedItem = value;
    }
    console.log('newState ', newState);
    this.setState( newState );
  };

  render() {
    return (
      <div>
        <Typography variant="caption"
        >
          Selected: {this.state.selectedItem}
        </Typography>
        <br />
        <Button 
          variant = "outlined" 
          color = "primary" 
          onClick = {this.handleClickOpen}
        >
          Open simple dialog
        </Button>
        <SimpleDialogStyled
          emails = {emails}          
          open = {this.state.open}
          onClose = {this.handleClose}
        />
      </div>
    );
  }
}

export default SimpleDialogDemo;
