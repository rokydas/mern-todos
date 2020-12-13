import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './SingleTodo.css';

const SingleTodo = ({ todo, index }) => {

    const email = localStorage.getItem('email');

    const [isUpdate, setIsUpdate] = useState(false);
    const [error, setError] = useState(false);
    const { _id, taskName, taskDetails } = todo;
    const [updatedTask, setUpdatedTask] = useState({ id: _id, email, taskName, taskDetails });
    
    const history = useHistory()

    const id = { _id };

    const deleteTodo = () => {
        fetch('https://mern-todos18.herokuapp.com/delete', {
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

    const updateBlur = (e) => {
        e.preventDefault();
        const newUpdatedTask = updatedTask;
        newUpdatedTask[e.target.name] = e.target.value;
        setUpdatedTask(newUpdatedTask);
    }

    const updateTodo = (e) => {
        fetch('https://mern-todos18.herokuapp.com/update', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedTask)
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

    return (
        <div>
            {isUpdate ?
                <form>
                    <h1 className="text-center">Update Todo serial no. {index + 1}</h1>
                    <input onBlur={updateBlur} defaultValue={taskName} name="taskName" type="text" className="form-control" placeholder="Task Name" required /><br />
                    <input onBlur={updateBlur} defaultValue={taskDetails} name="taskDetails" type="text" className="form-control" placeholder="Task Details" required /><br />

                    {error && <p className="text-danger text-center">Please fill up all fields</p>}

                    <div className="text-center">
                        <button className="btn btn-primary mb-5 mr-5" onClick={updateTodo}>Submit Updated Todo</button>
                        <button className="btn btn-warning mb-5" onClick={() => setIsUpdate(false)}>Cancel</button>
                    </div>
                </form>
                :
                <div className="todo-box text-center m-5">
                    <h4>Serial: {index + 1}</h4>
                    <h3><span className="c-green">Task Name:</span> {taskName}</h3>
                    <h3><span className="c-green">Task Details :</span> {taskDetails}</h3><br />
                    <button onClick={() => setIsUpdate(true)} className="btn btn-warning mr-5">Update</button>
                    <button onClick={deleteTodo} className="btn btn-danger">Delete</button>
                </div>}
        </div>
    );
};

export default SingleTodo;