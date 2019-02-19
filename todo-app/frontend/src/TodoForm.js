import React, { Component } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class TodoForm extends Component {

    constructor() {
        super();

        this.state = {
            todos: [],
            newTodoData: {
                title: ''    
            },
            newTodoModal: false
        };
    }

    componentWillMount() {
        this.refreshTodos();
    }

    toggleNewTodoModal() {
        this.setState ({
            newTodoModal: ! this.state.newTodoModal
        });
    }


    addTodo() {
        axios.post(`http://localhost:8080/todo/${this.props.location.state.id}`, { title: this.state.newTodoData.title, created: new Date(), done: false })
        .then(res => {
            console.log(res);
            console.log(res.data);
            
            let { todos } = this.state;
            todos.push(res.data);
            this.setState({ todos, newTodoModal: false, newTodoData: {title: ''}}); 
        });
    }

    deleteTodo(id) {
        axios.delete(`http://localhost:8080/todo/${id}`)
        .then(res => {
            console.log(res);
            console.log(res.data);
            
            this.refreshTodos();
        });
    }

    updateTodos(id, title, created, check) {
        axios.put(`http://localhost:8080/todo/${id}`, { id: id, title: title, created: new Date(), done: check })
        .then(res => {
            console.log(res);
            console.log(res.data);
            
            this.refreshTodos();
        });
    }

    refreshTodos() {
        axios.get(`http://localhost:8080/todo/${this.props.location.state.id}`)
        .then(res => {
            this.setState({ todos: res.data });
        })
    }

    
    render() {

        let todos = this.state.todos.map((todo) => {
            return (
                <tr key={todo.id}>
                    <td>{todo.title}</td>
                    <td>{todo.created}</td>
                    <td>
                        {todo.done.toString() == 'true' ? <Input type="checkbox" checked onClick={this.updateTodos.bind(this, todo.id, todo.title, todo.created, false)}></Input> 
                                                        : <Input type="checkbox" onClick={this.updateTodos.bind(this, todo.id, todo.title, todo.created, true)}></Input>}
                         
                    </td>
                    <td>
                        <Button color="danger" size="sm" onClick={this.deleteTodo.bind(this, todo.id)}>Delete</Button>
                    </td>
                </tr>
            )
        });

        return (

           <div className="container">

                <div className="Username">
                  <h1>{this.props.location.state.name}'s todos</h1> 
                </div>
            
                <Table>

                    <thead>
                        <tr>
                            <th class="col-6">Todo</th>
                            <th class="col-3">Created</th>
                            <th class="col-2">Done</th>
                            <th class="col-1">
                                <Link to="/" className="FormField__Link">Back</Link>
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {todos}
                    </tbody>

                    <Button color="primary" onClick={this.toggleNewTodoModal.bind(this)}>Add todo</Button>
                    <Modal isOpen={this.state.newTodoModal} toggle={this.toggleNewTodoModal.bind(this)} autoFocus={false}>
                        <ModalHeader toggle={this.toggleNewTodoModal.bind(this)}>Add a new todo</ModalHeader>
                        <ModalBody>
                            <FormGroup>
                                <Label for="Todo">Todo</Label>
                                <Input id="Todo" value={this.state.newTodoData.title} onChange={(e) => {
                                    let { newTodoData } = this.state;
                                    newTodoData.title = e.target.value;
                                    this.setState({ newTodoData });
                                }} autoFocus/>
                            </FormGroup>               
                        </ModalBody>
                        <ModalFooter>
                            <Button color="primary" onClick={this.addTodo.bind(this)}>Add todo</Button>{' '}
                            <Button color="secondary" onClick={this.toggleNewTodoModal.bind(this)}>Cancel</Button>
                        </ModalFooter>
                    </Modal>
                    
                </Table> 


           </div>

          
        );
    }

}

export default TodoForm;