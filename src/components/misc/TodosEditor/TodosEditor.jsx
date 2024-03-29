import * as React from 'react';
import Typography from '@mui/material/Typography';

import TodoForm from './TodoForm';
import TodoList from './TodoList';
import useTodoState from './useTodoState';
import './TodosEditor.css';


const TodosEditor = () => {

    const {
        todos,
        addTodo,
        deleteTodo
    } = useTodoState([]);

    const saveTodo = (todoText) => {
        const trimmedText = todoText.trim();
        if (trimmedText.length > 0) {
            addTodo(trimmedText);
        }
    };

    return (
        <div className="TodosEditor">
            <Typography component="h1" variant="h2"
            >Todos
            </Typography>

            <TodoForm saveTodo={saveTodo} />

            <TodoList todos={todos} deleteTodo={deleteTodo} />
        </div>
    );
};

export default TodosEditor;
