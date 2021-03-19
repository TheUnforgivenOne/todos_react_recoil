import React from 'react';
import AddTodo from '../AddTodo/AddTodo';
import TodoList from '../TodoList/TodoList';

import './App.css';

const App: React.FunctionComponent = () => {
  return (
    <div className='container'>
      <h1>TODOS app (React + Recoil)</h1>
      <AddTodo />
      <TodoList />
    </div>
  );
};

export default App;
