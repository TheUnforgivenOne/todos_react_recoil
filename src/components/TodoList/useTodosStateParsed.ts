import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getTodos, todoListState, todosMultiplier } from "../../atoms/todoListState";
import { parseLoadableValue } from "../../utils/parseLoadableValue";

export const useTodosStateParsed = () => {
    const [multiplier, setMultiplier] = useRecoilState(todosMultiplier);
    const [todos, setTodos] = useRecoilState(todoListState);
    const { status: fetchingState, data: fetchedTodos } = parseLoadableValue(useRecoilValueLoadable(getTodos));

    useEffect(() => {
        if (fetchingState === 'hasValue') {
            const newTodos = multiplier === 0
                ? fetchedTodos
                : [...todos, ...fetchedTodos];
            setTodos(newTodos);
        }
    }, [fetchingState]);

    return { todos, fetchingState, loadMoreTodos: () => setMultiplier(prev => prev + 1) }
};
