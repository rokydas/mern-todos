import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import SingleTodo from '../SingleTodo/SingleTodo';

const TodoList = () => {
    const history = useHistory()

    const email = localStorage.getItem('email');
    const [error, setError] = useState(false);
    const [todos, setTodos] = useState([]);
    const [inputTodo, setInputTodo] = useState({ email });

    const handleBlur = (e) => {
        const newTodo = inputTodo;
        newTodo[e.target.name] = e.target.value;
        setInputTodo(newTodo);
        console.log(inputTodo);
    }

    useEffect(() => {
        fetch('https://mern-todos18.herokuapp.com/todos')
            .then(res => res.json())
            .then(data => setTodos(data));
    }, [])

    const addTodo = (e) => {
        fetch('https://mern-todos18.herokuapp.com/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(inputTodo)
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    history.replace('/');
                    history.go(0);
                }
                else {
                    setError(true);
                }
            });
        e.preventDefault();
    }

    const logOut = () => {
        localStorage.clear();
        history.replace('/');
        history.go(0);
    }

    const selectedTodos = todos.filter(todo => todo.email == email);

    return (
        <div className="container">
            <h1 className="text-center m-5">Your Gmail: {email}</h1>
            <div className="text-center">
                <button onClick={logOut} className="btn btn-primary">Logout</button>
            </div>
            <h1 className="text-center m-5">Your Todos</h1>
            {
                selectedTodos.map((todo, index) => <SingleTodo key={todo._id} index={index} todo={todo} />)
            }
            <h1 className="text-center mb-5">Create new Todo</h1>
            <form>
                <input onBlur={handleBlur} name="taskName" type="text" className="form-control" placeholder="Task Name" required /><br />
                <input onBlur={handleBlur} name="taskDetails" type="text" className="form-control" placeholder="Task Details" required /><br />

                {error && <p className="text-danger text-center">Please fill up all fields</p>}

                <div className="text-center">
                    <button className="btn btn-primary mb-5" onClick={addTodo}>Add Todo</button>
                </div>
            </form>
        </div>
    );
};

export default TodoList;