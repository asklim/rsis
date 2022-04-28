import * as React from 'react';
import PropTypes from 'prop-types';

import {
    List,
    ListItem,
    ListItemSecondaryAction,
    ListItemText,
    Checkbox,
    IconButton,
} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';

const TodoList = ({ todos, deleteTodo }) => (
    <List>
        {todos.map( (todo, index) => (
            <ListItem key ={index.toString()} dense button>
                <Checkbox tabIndex ={-1} disableRipple />
                <ListItemText primary ={todo} />
                <ListItemSecondaryAction>
                    <IconButton aria-label ="Delete"
                        onClick ={ () => { deleteTodo( index ); }} >
                        <DeleteIcon />
                    </IconButton>
                </ListItemSecondaryAction>
            </ListItem>
        ))}
    </List>
);
TodoList.propTypes = {
    todos : PropTypes.array.isRequired,
    deleteTodo : PropTypes.func.isRequired
};

export default TodoList;