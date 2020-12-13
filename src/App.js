import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import TodoList from './components/TodoList/TodoList';

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <PrivateRoute exact path="/">
            <TodoList />
          </PrivateRoute>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
