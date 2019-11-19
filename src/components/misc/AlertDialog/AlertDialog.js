import React, { useState } from "react";

// @material-ui/core components
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


const AlertDialog = () => 
{
  const [ open, setOpen ] = useState( false );
  const [ selectedValue, setSelectedValue ] = useState( '' );

  const handleClickOpen = () => setOpen( true );

  const handleClose = () => setOpen( false );
  
  const handleCloseYes = () => {
    setOpen( false );
    setSelectedValue( 'Yes' );
  };

  const handleCloseNo = ()=> {
    setOpen( false );
    setSelectedValue( 'No' );
  };

  return (
    <div>
      <span>
      <Button onClick ={handleClickOpen}
        variant ="outlined" 
        color ="primary"         
      >
        Open alert dialog
      </Button>
      <Typography variant ="subtitle1">
          Selected: {selectedValue}
      </Typography>
      </span>

      <Dialog open ={open} onClose ={handleClose}
        aria-labelledby ="alert-dialog-title"
        aria-describedby ="alert-dialog-description"
      >
        <DialogTitle id ="alert-dialog-title"
        >
          {"Use Google's location service?"}
        </DialogTitle>

        <DialogContent>
          <DialogContentText id ="alert-dialog-description">
            Let Google help apps determine location. This means sending anonymous location data to
            Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick ={handleCloseNo} color ="primary">
            Disagree
          </Button>
          <Button onClick ={handleCloseYes} color ="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
        
      </Dialog>
    </div>
  );
};

export default AlertDialog;