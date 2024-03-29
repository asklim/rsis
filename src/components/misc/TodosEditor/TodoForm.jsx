import * as React from 'react';
import PropTypes from 'prop-types';

//import Button from '@mui/material/Button';
import Fab from '@mui/material/Fab';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Fingerprint from '@mui/icons-material/Fingerprint';

//import CustomInput from 'components/CustomInput/CustomInput.jsx';
import GridContainer from 'components/Grid/GridContainer.jsx';
import GridItem from 'components/Grid/GridItem.jsx';
import SimpleDialog from 'components/SimpleDialog/SimpleDialog.jsx';

import useInputState from './useInputState.js';

const defaultEmails = [
    'username@gmail.com',
    'user02@gmail.com'
];

const TodoForm = ({ saveTodo }) => {

    const fetchEmails = () => { return defaultEmails; };
    const emails = fetchEmails();

    const {
        value,
        reset,
        setValue,
        onChange
    } = useInputState();

    const [selectedValue, setSelectedValue] = React.useState(emails[1]);
    const [open, setOpen] = React.useState(false);


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = value => {
        setOpen(false);
        setSelectedValue(value);
        setValue(value);
    };

    return (
        <form
            onSubmit={event =>
            {
                //alert('onSubmit');
                event.preventDefault();
                saveTodo(value);
                reset();
            }}
        >
            <GridContainer spacing="16" >
                <GridItem>
                    <TextField
                        variant="outlined"
                        placeholder="Add todo"
                        margin="normal"
                        onChange={onChange}
                        value={value}
                    />
                </GridItem>
                {/*
      <GridItem xs={12} sm={12} md={4}>
        <CustomInput
          labelText="Email address"
          id="email-address"
          formControlProps={{
            fullWidth: true
          }}
        />
      </GridItem>
        {alert('Hello from TodoForm')*/}
                <GridItem>
                    <Fab
                        variant="contained" color="secondary"
                        onClick={handleClickOpen}
                    >
                        <Fingerprint />
                        <i className="fa fa-cog fa-2x" />
                    </Fab>
                </GridItem>
                <GridItem>
                    <Typography
                        variant="caption"
                    >
          Selected: {selectedValue}
                    </Typography>
                </GridItem>
            </GridContainer>

            <SimpleDialog
                open={open} onClose={handleClose}
                selectedValue={selectedValue}
                emails={emails}
            />

        </form>
    );
};

TodoForm.propTypes = {
    saveTodo: PropTypes.func.isRequired
};

export default TodoForm;
