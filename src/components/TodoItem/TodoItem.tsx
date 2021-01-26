import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import { useRecoilState } from 'recoil';
import { todoListState } from '../../atoms/todoListState';

import './TodoItem.css';

interface TodoItemProps {
    item: {userId: number, id: number, title: string, completed: boolean},
    index: number,
    classes: Array<string>
}

const TodoItem: React.FunctionComponent<TodoItemProps> = ({ item, index, classes }) => {
    const [todoList, setTodoList] = useRecoilState(todoListState);

    const toggleTodo = () => {
        const newList: any = replaceItemAtIndex(todoList, index, {
            ...item,
            completed: !item.completed,
        })
        setTodoList(newList);
    }

    const deleteTodo = (id: number) => {
        const newList: any = todoList.filter((todo: any) => todo.id !== id);
        setTodoList(newList);
    }

    return (
        <li key={item.id} className='item'>
            <input
                type='checkbox'
                className='checkbox'
                checked={item.completed}
                onChange={toggleTodo}
            />
            <strong>{index + 1}</strong>
            <span className={classes.join(' ')}>{item.title}</span>
            <DeleteIcon className="deleteIcon" onClick={() => deleteTodo(item.id)} />
        </li>
    )
}

const replaceItemAtIndex = (
    arr: { id: number; completed: boolean; title: string; userId: number }[],
    index: number,
    newValue: { id: number; completed: boolean; title: string; userId: number }
) => {
    return [...arr.slice(0, index), newValue, ...arr.slice(index + 1)];
}

export default TodoItem;
