import { selector } from 'recoil';
import axios from 'axios';

const fetchUrl = 'https://jsonplaceholder.typicode.com/todos?_limit=10';

export const getTodosList = selector({
    key: 'getTodosList',
    get: async () => {
        try {
            return await axios.get(fetchUrl)
                .then(res => res.data);
        } catch (err) {
            throw err;
        }
    }
})
