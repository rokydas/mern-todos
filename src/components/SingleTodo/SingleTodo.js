import React from 'react';
import { useHistory } from 'react-router-dom';
import './SingleTodo.css';

const SingleTodo = ({ todo, index }) => {

    const { _id, taskName, taskDetails } = todo;
    const history = useHistory()

    const id = {_id};

    const deleteTodo = () => {
        fetch('http://localhost:5000/delete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
        })
            .then(res => res.json())
            .then(data => {
                history.replace('/');
                history.go(0);
            });
    }

    return (
        <div className="todo-box text-center m-5">
            <h4>Serial: {index + 1}</h4>
            <h3><span className="c-green">Task Name:</span> {taskName}</h3>
            <h3><span className="c-green">Task Details :</span> {taskDetails}</h3><br />
            <button className="btn btn-warning mr-5">Update</button>
            <button onClick={deleteTodo} className="btn btn-danger">Delete</button>
        </div>
    );
};

export default SingleTodo;