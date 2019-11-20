import React, { useState } from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import styles from "assets/jss/misc/todosInputListStyle.js";

const useStyles = makeStyles( styles );


export default function TodosInputList () 
{
  const classes = useStyles();
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

  return ( 
    <div>
      <TodoForm saveTodo ={saveTodo} />
      <TodoList todos ={todos} deleteTodo ={deleteTodo} classes ={classes}/>
    </div>
  );
}
/*
TodosInputList.defaultProps = {
  color: "gray"
};
*/