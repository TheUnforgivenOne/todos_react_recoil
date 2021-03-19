import React, { useCallback, useRef } from 'react';
import { useTodosState } from './useTodosState';
import TodoItem, { TodoItemInterface } from '../TodoItem/TodoItem';

import './TodoList.css';

const TodoList: React.FunctionComponent = () => {
    const { todos, fetchingState, loadMoreTodos } = useTodosState();

    const observer = useRef<IntersectionObserver | null>(null);

    const lastItem = useCallback((node) => {
        if (observer.current) observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            const target = entries[0];
            if (target.isIntersecting) loadMoreTodos();
        });
        if (node) observer.current.observe(node);
    }, []);

    return (
        <>
            <ul className='list'>
                {
                    todos.length === 0
                        ?   <div>No todos!</div>
                        :   todos.map((item: TodoItemInterface, index: number) => {
                            const classes = ['title'];
                            if (item.completed) {
                                classes.push('done');
                            }
                            return <TodoItem
                                ref={todos.length === index + 1 ? lastItem : null }
                                item={item}
                                index={index}
                                classes={classes}
                            />
                        })
                }
            </ul>
            {fetchingState === 'loading' && <div>Loading...</div>}
        </>
    )
};

export default TodoList;
