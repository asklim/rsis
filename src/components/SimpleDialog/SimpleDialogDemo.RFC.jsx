import React, { useState } from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import { 
  Button,  
  Typography,
} from '@material-ui/core';

import SimpleDialog from './SimpleDialog.RFC.jsx';
import styles from './simpleDialogStyle.jsx';

const emails = ['FunctionComp@gmail.com', 'ReactFC@gmail.com'];

const SimpleDialogStyled = withStyles(styles)(SimpleDialog);

const SimpleDialogDemo = () => 
{
  const [open, setOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(emails[0]);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = value => {    
    console.log('selectedValue ', value);
    if(typeof value === 'string') {
      setSelectedValue(value);
    }
    setOpen(false);
  };

  return (
    <div>
      <Typography variant="subtitle1"
        >Selected: {selectedValue}
      </Typography>

      <br />
      <Button variant="outlined" 
              color="primary" 
              onClick={handleClickOpen}
      >
        Open simple dialog
      </Button>
      <SimpleDialogStyled
        emails={emails}
        open={open} 
        onClose={handleClose} 
      />
    </div>
  );
};

export default SimpleDialogDemo;
