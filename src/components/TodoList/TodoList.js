import React, { useEffect, useState } from 'react';
import SingleTodo from '../SingleTodo/SingleTodo';

const TodoList = () => {

    const email = localStorage.getItem('email');
    const [todos, setTodos] = useState([]);
    const [inputTodo, setInputTodo] = useState({ email });

    const handleBlur = (e) => {
        const newTodo = inputTodo;
        newTodo[e.target.name] = e.target.value;
        setInputTodo(newTodo);
        console.log(inputTodo);
    }

    useEffect(() => {
        fetch('http://localhost:5000/todos')
            .then(res => res.json())
            .then(data => setTodos(data));
    }, [])

    const addTodo = (e) => {

        // fetch('https://chatbot1870.herokuapp.com/insert', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify(inputQA)
        // })
        //     .then(res => res.json())
        //     .then(data => {
        //         history.replace('/');
        //         history.go(0);
        //     });
        // e.preventDefault();
    }

    const selectedTodos = todos.filter(todo => todo.email == email);

    return (
        <div className="container">
            <h1 className="text-center m-5">Your Gmail: {email}</h1>
            <h1 className="text-center m-5">Your Todos</h1>
            {
                selectedTodos.map((todo, index) => <SingleTodo key={todo._id} index={index} todo={todo} />)
            }
            <form>
                <input onBlur={handleBlur} name="taskName" type="text" className="form-control" placeholder="New Question" required /><br />
                <input onBlur={handleBlur} name="taskDetails" type="text" className="form-control" placeholder="New Answer" required /><br />
                <button className="btn btn-primary" onClick={addTodo}>Add Todo</button>
            </form>
        </div>
    );
};

export default TodoList;