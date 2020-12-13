import React from 'react';
import './SingleTodo.css';

const SingleTodo = ({todo, index}) => {

    const {taskName, taskDetails} = todo;

    return (
        <div className="todo-box text-center m-5">
            <h4>Serial: {index+1}</h4>
            <h3><span className="c-green">Task Name:</span> {taskName}</h3>
            <h3><span className="c-green">Task Details :</span> {taskDetails}</h3><br/>
            <button className="btn btn-warning mr-5">Update</button>
            <button className="btn btn-danger">Delete</button>
        </div>
    );
};

export default SingleTodo;