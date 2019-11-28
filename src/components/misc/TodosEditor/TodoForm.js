import React from 'react';
import TextField from '@material-ui/core/TextField';
import PropTypes from 'prop-types';

import useInputState from './useInputState';

const TodoForm = ({ saveTodo }) => {
  const { value, reset, onChange } = useInputState();

  return (
    <form
      onSubmit={event => {
        event.preventDefault();

        saveTodo(value);
        reset();
      }}
    >
      <TextField
        variant="outlined"
        placeholder="Add todo"
        margin="normal"
        onChange={onChange}
        value={value}
      />
    </form>
  );
};

TodoForm.propTypes = {
  saveTodo: PropTypes.func.isRequired
};

export default TodoForm;