import React, { Component } from 'react';
import ToDoItem from './ToDoItem'
class ToDo extends Component {
  render() {
    return this.props.todos.map((todo) => (
      	<ToDoItem key={todo.todo_index} todo={todo} markComplete={this.props.markComplete} delToDo={this.props.delToDo}/>
      ));
  }
}
export default ToDo;
