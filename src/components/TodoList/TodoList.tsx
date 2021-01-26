import React, { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from "recoil";
import { todoListState } from '../../atoms/todoListState';
import { getTodosList } from '../../selectors/getTodoList';
import TodoItem from '../TodoItem/TodoItem';

import './TodoList.css';

const TodoList: React.FunctionComponent = () => {
    const [todos, setTodos] = useRecoilState(todoListState);
    const fetchedTodos = useRecoilValue(getTodosList);

    useEffect(() => {
        setTodos(fetchedTodos);
    }, []);

    return (
        <ul className='list'>
            {
                todos.length === 0
                    ?   <div>No todos!</div>
                    :   todos.map((item: {userId: number, id: number, title: string, completed: boolean}, index: number) => {
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
