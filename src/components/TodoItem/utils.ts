import { TodoItemInterface } from "./TodoItem";

export const replaceItemAtIndex = (
    arr: TodoItemInterface[],
    index: number,
    newValue: TodoItemInterface
) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
};
