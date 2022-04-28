import React, { useState } from 'react';
// Google Material-UI/core components
import { makeStyles } from "@mui/styles";

import TodoForm from './TodoForm.jsx';
import TodoList from './TodoList.jsx';
import styles from "assets/jss/misc/todosInputListStyle.js";

const useStyles = makeStyles( styles );


export default function TodosInputList () {

    const classes = useStyles();
    const [ todos, setTodos ] = useState( [] );

    const addTodo = todoText => setTodos([ ...todos, todoText ]);

    const deleteTodo = (todoIndex) => {
    //TODO: filter - спорный метод. Надо поразмыслить.
        let newTodos = todos.filter( (_, index) => index !== todoIndex );
        setTodos( newTodos );
    };

    const saveTodo = (todoText) => {
        let newTodo = todoText.trim();
        if( newTodo ) {
            addTodo( newTodo );
        }
    };

    return (<>
        <TodoForm saveTodo ={saveTodo} />
        <TodoList
            todos ={todos}
            deleteTodo ={deleteTodo}
            classes ={classes}
        />
    </>);
}
/*
TodosInputList.defaultProps = {
  color: "gray"
};
*/