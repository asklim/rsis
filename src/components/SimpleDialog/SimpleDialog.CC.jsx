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

class SimpleDialog extends React.Component {
  // eslint-disable-next-line no-unused-vars
  handleDialogClose = (event, reason) => {
    console.log('simpleDialog close event ', event);
    console.log('simpleDialog onClose with reason = ', reason);
    // Если не вызывается вообще, см. render() - this.props.onClose 
    this.props.onClose( null );
  };
  handleEscapeKeyDown = () => {
    console.log('simpleDialog Escape Key Pressed');
    //this.props.onClose("");
  };  
  handleBackdropClick = () => {
    console.log('simpleDialog Backdrop Clicked');
    //this.props.onClose("");
  }; 

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  render() {
    const { 
      open, emails,
      // eslint-disable-next-line no-unused-vars
      onClose,  //Эта Func не нужна, но надо извлечь её из other,
                //которое передается как children в Dialog, и вызывается напрямую
                //вместо handleDialogClose, как Demo.handleClose(event)
      classes, ...other } = this.props;

    return (
      <Dialog 
        open = {open}
        onClose = {this.handleDialogClose}
        onEscapeKeyDown = {this.handleEscapeKeyDown}
        onBackdropClick = {this.handleBackdropClick}
        onEnter = {() => console.log('simpleDialog on Enter')}
        onEntering = {() => console.log('simpleDialog on Entering')}
        onEntered = {() => console.log('simpleDialog on Entered')}
        onExit = {() => console.log('simpleDialog on Exit')}
        onExiting = {() => console.log('simpleDialog on Exiting')}
        onExited = {() => console.log('simpleDialog on Exited')}
        aria-labelledby="simple-dialog-title" 
        {...other}
      >
        <DialogTitle id="simple-dialog-title">Set backup account</DialogTitle>
        <div>
          <List>
            {emails.map(email => (
              <ListItem 
                button 
                onClick={() => this.handleListItemClick(email)} 
                key={email}
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
              onClick={() => this.handleListItemClick('addAccount')}
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
  }
}

SimpleDialog.propTypes = {
  open: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  onClose: PropTypes.func,
  selectedItem: PropTypes.string,
  emails: PropTypes.array,
};

export default SimpleDialog;