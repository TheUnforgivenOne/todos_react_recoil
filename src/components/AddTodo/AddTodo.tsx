import React, { useState } from 'react';
import { useSetRecoilState } from "recoil";
import { todoListState } from "../../atoms/todoListState";

import './AddTodo.css';

const AddTodo: React.FunctionComponent = () => {
    const [title, setTitle] = useState<string>('');
    const setTodoList = useSetRecoilState(todoListState);

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value);
    };

    const addTodo = () => {
        setTodoList((oldTodoList) => [
            {
                userId: 1,
                id: Date.now(),
                title: title,
                completed: false,
            },
            ...oldTodoList,
        ]);
    };

    const submitHandler = (event: React.FormEvent) => {
        event.preventDefault();
        addTodo();
        setTitle('');
    };

    return (
        <form onSubmit={submitHandler} className='form'>
            <input
                type='text'
                value={title}
                placeholder='Enter todo title'
                onChange={changeHandler}
                className='input'
            />
            <button type='submit'>Add todo</button>
        </form>
    )
};

export default AddTodo;
