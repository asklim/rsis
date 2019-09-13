import React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@material-ui/core/styles';

import { 
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  DialogTitle,
  Dialog,
} from '@material-ui/core';
import {
  Person as PersonIcon,
  Add as AddIcon 
} from '@material-ui/icons';


const SimpleDialog = (props) =>
{
  const { 
    open, onClose, emails, 
    classes, ...other 
  } = props;

  const handleDialogClose = (event, reason) => {
    console.log('simpleDialog onClose with reason = ', reason);
    onClose(null);
  };
  const handleEscapeKeyDown = () => {
    console.log('simpleDialog Escape Key Pressed');
  };  
  const handleBackdropClick = () => {
    console.log('simpleDialog Backdrop Clicked');
  }; 

  const handleListItemClick = value => {
    onClose(value);
  };

  return (
    <Dialog 
      open = {open}
      onClose = {handleDialogClose}
      onEscapeKeyDown = {handleEscapeKeyDown}
      onBackdropClick = {handleBackdropClick}
      {...other}
      aria-labelledby="simple-dialog-title"       
    >
      <DialogTitle id="simple-dialog-title">Set account email</DialogTitle>
      <div>
        <List>
          {emails.map(email => (
            <ListItem 
              button 
              onClick = {() => handleListItemClick(email)} 
              key = {email}
            >
              <ListItemAvatar>
                <Avatar className={classes.avatar}>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={email} />
            </ListItem>
          ))}
          <ListItem 
            button 
            onClick = {() => handleListItemClick('addAccount')}
          >
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="add account" />
          </ListItem>
        </List>
      </div>
    </Dialog>
  );
};

SimpleDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  emails: PropTypes.array,
  classes: PropTypes.object.isRequired,
};

export default SimpleDialog;
