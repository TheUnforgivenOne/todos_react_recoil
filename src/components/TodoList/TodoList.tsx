import React, { useCallback, useRef } from 'react';
import { useTodosState } from './useTodosState';
import { useTodosStateParsed } from "./useTodosStateParsed";
import { useTodosStateParsedOld } from "./useTodosStateParsedOld";
import TodoItem, { TodoItemInterface } from '../TodoItem/TodoItem';

import './TodoList.css';

const TodoList: React.FunctionComponent = () => {
    const { todos, fetchingState, loadMoreTodos } = useTodosState();
    // const { todos, fetchingState, loadMoreTodos } = useTodosStateParsed();
    // const { todos, fetchingState, loadMoreTodos } = useTodosStateParsedOld();

    const observer = useRef<IntersectionObserver | null>(null);

    const lastItem = useCallback((node) => {
        observer.current && observer.current.disconnect();
        observer.current = new IntersectionObserver((entries) => {
            const target = entries[0];
            target.isIntersecting && loadMoreTodos();
        });
        node && observer.current.observe(node);
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
