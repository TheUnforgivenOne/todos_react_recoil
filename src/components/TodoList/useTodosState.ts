import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getTodos, todoListState, todosMultiplier } from '../../atoms/todoListState';

export const useTodosState = () => {
    const [multiplier, setMultiplier] = useRecoilState(todosMultiplier);
    const [todos, setTodos] = useRecoilState(todoListState);
    const fetchingTodos = useRecoilValueLoadable(getTodos);

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
                const newTodos = multiplier === 0
                    ? fetchedTodos
                    : [...todos, ...fetchedTodos];
                setTodos(newTodos);
                setFetchingState('hasValue');
        }
    }, [fetchingTodos]);

    return { todos, fetchingState, loadMoreTodos: () => setMultiplier(prev => prev + 1) };
};
