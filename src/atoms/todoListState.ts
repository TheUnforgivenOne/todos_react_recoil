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

export const getTodosList = selector({
    key: 'getTodosList',
    get: async ({ get }) => {
        const multiplier = get(todosMultiplier);
        const query = `?_page=${10 * multiplier}$_limit=10`;

        return await axios.get(fetchUrl + query)
            .then(res => res.data);
    }
});
