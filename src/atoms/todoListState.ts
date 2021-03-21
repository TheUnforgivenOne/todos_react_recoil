import axios from 'axios';
import { atom, selector } from 'recoil';
import { TodoItemInterface } from "../components/TodoItem/TodoItem";

const fetchUrl = 'https://jsonplaceholder.typicode.com/todos';

export const todoListState = atom<TodoItemInterface[]>({
    key: 'todoListState',
    default: [],
});

export const todosMultiplier = atom<number>({
    key: 'multiplier',
    default: 0,
});

export const getTodos = selector({
    key: 'getTodos',
    get: async ({ get }) => {
        const multiplier = get(todosMultiplier);
        const query = `?_page=${multiplier}$_limit=10`;

        return await axios.get(fetchUrl + query)
            .then(res => res.data);
    }
});

export const getTodosCustomStatus = selector({
    key: 'getTodosCustomStatus',
    get: async ({ get }) => {
        const multiplier = get(todosMultiplier);
        const query = `?_page=${multiplier}$_limit=10`;

        const response = await axios.get(fetchUrl + query)
            .then(res => res.data);
        return { status: 'customStatus', fetchedData: response };
    }
});
