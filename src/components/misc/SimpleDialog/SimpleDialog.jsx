import * as React from 'react';
import PropTypes from 'prop-types';
//import { withStyles } from '@mui/styles';

import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    DialogTitle,
    Dialog,
} from '@mui/material';
import {
    Person as PersonIcon,
    Add as AddIcon
} from '@mui/icons-material';


const SimpleDialog = ({
    open,
    onClose,
    emails,
    classes,
    ...rest
}) => {
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
        onClose( value );
    };

    return (
        <Dialog
            open = {open}
            onClose = {handleDialogClose}
            onEscapeKeyDown = {handleEscapeKeyDown}
            onBackdropClick = {handleBackdropClick}
            {...rest}
            aria-labelledby="simple-dialog-title"
        >
            <DialogTitle id="simple-dialog-title">Set account email</DialogTitle>
            <div>
                <List>
                    {emails.map( email => (
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
    //selectedValue: PropTypes.string,
    classes: PropTypes.object.isRequired,
};

export default SimpleDialog;
