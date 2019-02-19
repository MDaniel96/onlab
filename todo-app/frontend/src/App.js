import React, { Component } from 'react';
import './App.css';
import SignUpForm from './SignUpForm';
import { BrowserRouter as Router, Route, Link, NavLink } from 'react-router-dom';
import TodoForm from './TodoForm';

class App extends Component {
  render() {
    return (
      <Router basename="/todo-app/">
        <div className="App">


          <Route exact path="/" component={SignUpForm}>
          </Route>
          
          <Route exact path="/todos" component={TodoForm} >
          </Route>


        </div>
      </Router>
    );
  }
}

export default App;
