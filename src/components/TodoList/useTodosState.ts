import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getTodosList, todoListState, todosMultiplier } from '../../atoms/todoListState';

export const useTodosState = () => {
    const [multiplier, setMultiplier] = useRecoilState(todosMultiplier);
    const fetchingTodos = useRecoilValueLoadable(getTodosList);
    const [todos, setTodos] = useRecoilState(todoListState);
    const [fetchingState, setFetchingState] = useState('loading');

    useEffect(() => {
        switch (fetchingTodos.state) {
            case 'hasError':
                setFetchingState('hasError');
                throw fetchingTodos.contents;
            case 'loading':
                setFetchingState('loading');
                break;
            default:
                const fetchedTodos = fetchingTodos.contents;
                const newTodos = [...todos, ...fetchedTodos];
                setTodos(newTodos);
                setFetchingState('hasValue');
        }
    }, [fetchingTodos]);

    return { todos, fetchingState };
};
