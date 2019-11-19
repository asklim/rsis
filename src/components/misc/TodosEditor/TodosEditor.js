import React, { useState } from 'react';
import Typography from '@material-ui/core/Typography';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import './TodosEditor.css';

const TodosEditor = () =>
{
  const [ todos, setTodos ] = useState( [] );  

  const addTodo = todoText => setTodos( [...todos, todoText] );
  
  const deleteTodo = todoIndex => {
    // filter - спорный метод. Надо поразмыслить.
    let newTodos = todos.filter( (_, index) => index !== todoIndex );
    setTodos( newTodos );
  };

  const saveTodo = todoText => {
    let newTodo = todoText.trim();
    if( newTodo ) {
      addTodo( newTodo );
    }
  };

  return ( //className="TodosEditor"
    <div>
      <Typography component ="h1" variant ="h2">
        Todos
      </Typography>

      <TodoForm saveTodo ={saveTodo} />

      <TodoList todos ={todos} deleteTodo ={deleteTodo} />
    </div>
  );
};

export default TodosEditor;
