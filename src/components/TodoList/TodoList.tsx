import React from 'react';
import { useTodosState } from './useTodosState';
import TodoItem, { TodoItemInterface } from '../TodoItem/TodoItem';

import './TodoList.css';

const TodoList: React.FunctionComponent = () => {
    const { todos, fetchingState } = useTodosState();

    if (fetchingState === 'loading') {
        return <div>Loading</div>
    }

    return (
        <ul className='list'>
            {
                todos.length === 0
                    ?   <div>No todos!</div>
                    :   todos.map((item: TodoItemInterface, index: number) => {
                        const classes = ['title'];
                        if (item.completed) {
                            classes.push('done');
                        }
                        return <TodoItem item={item} index={index} classes={classes} />
                    })
            }
        </ul>
    )
};

export default TodoList;
