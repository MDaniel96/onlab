import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';


class SignUpForm extends Component {

    constructor() {
        super();

        this.state = {
            username: '',
            redirect: false,
            userid: 0
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();
      
        axios.post('http://localhost:8080/user', { name: this.state.username })
        .then(res => {
            console.log(res);
            console.log(res.data);
            this.setState({ userid: res.data, redirect: true });
        })
    }


    render() {
        return (

          <form className="FormField" onSubmit={this.handleSubmit}>

            <div className="FormTitle">
                  <h1>Todo app</h1> 
            </div>
          
            <div className="FormField">
                <input type="text" id="username" className="FormField__Input" placeholder="Enter your username" 
                       name="username" value={this.state.username} onChange={this.handleChange}/>
            </div>

            <div className="FormField">
                <button to="/todos" className="FormField__Button mr-20">
                    Sign in
                </button>      
            </div>

            {this.state.redirect && (<Redirect to={{pathname: '/todos', state: { id: this.state.userid, name: this.state.username }}}/>)}  

          </form>      
          
        );
    }

}

export default SignUpForm;