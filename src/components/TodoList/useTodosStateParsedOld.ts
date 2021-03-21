import { useEffect } from "react";
import { useRecoilState, useRecoilValueLoadable } from "recoil";
import { getTodosCustomStatus, todoListState, todosMultiplier } from "../../atoms/todoListState";
import { parseLoadableValue } from "../../utils/parseLoadableValue";

export const useTodosStateParsedOld = () => {
    const [multiplier, setMultiplier] = useRecoilState(todosMultiplier);
    const [todos, setTodos] = useRecoilState(todoListState);
    const { status: fetchingState, data: fetchedTodos } = parseLoadableValue(useRecoilValueLoadable(getTodosCustomStatus));

    useEffect(() => {
        if (fetchingState === 'customStatus') {
            const newTodos = multiplier === 0
                ? fetchedTodos
                : [...todos, ...fetchedTodos];
            setTodos(newTodos);
        }
    }, [fetchingState]);

    return { todos, fetchingState, loadMoreTodos: () => setMultiplier(prev => prev + 1) }
};
