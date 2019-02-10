import React from "react";
import { Mutation } from "react-apollo";
import { QUERY_TODO, MUTATE_ADD_TODO } from "../utils/graphql";

const todo_done = false;

export default class TodoInput extends React.Component {
  constructor() {
    super();
    this.state = {
      textboxValue: "",
      todo_index: 0,
      todo_done: todo_done
    };
  }

  handleTextboxValueChange = e => {
    this.setState({
      ...this.state,
      textboxValue: e.target.value
    });
  };

  handleTextboxKeyPress = (e, addTodo) => {
    e.preventDefault();
    if (e.key === "Enter") {
      const newTask = this.state.textboxValue;
      const user_id = this.props.user_id;
      addTodo({
        variables: {
          user_id: user_id,
          todo_value: newTask,
          todo_index: this.props.todo_index,
          todo_done: this.state.todo_done
        },
        update: (store, { data: { insert_todoos } }) => {
          const data = store.readQuery({
            query: QUERY_TODO,
            variables: { user_id: user_id }
          });
          const insertedTodo = insert_todoos.returning;
          // console.log(insert_todoos.returning);
          data.todoos.splice(0, 0, insertedTodo[0]);
          store.writeQuery({
            query: QUERY_TODO,
            variables: { user_id: user_id },
            data
          });
          this.setState({
            ...this.state,
            textboxValue: "",
            todo_index: this.props.todo_index + 1
          });
        }
      });
    }
  };
  handleButtonPress = add(e,Todo) => {
    e.preventDefault();
    const newTask = this.state.textboxValue;
      const user_id = this.props.user_id;
      addTodo({
        variables: {
          user_id: user_id,
          todo_value: newTask,
          todo_index: this.props.todo_index,
          todo_done: this.state.todo_done
        },
        update: (store, { data: { insert_todoos } }) => {
          const data = store.readQuery({
            query: QUERY_TODO,
            variables: { user_id: user_id }
          });
          const insertedTodo = insert_todoos.returning;
          // console.log(insert_todoos.returning);
          data.todoos.splice(0, 0, insertedTodo[0]);
          store.writeQuery({
            query: QUERY_TODO,
            variables: { user_id: user_id },
            data
          });
          this.setState({
            ...this.state,
            textboxValue: "",
            todo_index: this.props.todo_index + 1
          });
        }
      });
  };
  render() {
    return (
      <Mutation mutation={MUTATE_ADD_TODO}>
        {(addTodo, { data, loading, called, error }) => {
          return (
            <form
              ref="form"
              className="form-inline" >
              <input
                className="form-control"
                placeholder="Add a todo"
                onKeyPress={e => {
                  this.handleTextboxKeyPress(e, addTodo);
                }}
                onChange={this.handleTextboxValueChange}
                value={this.state.textboxValue}
              />
              <button type="submit" className="btn btn-default" onClick={e => {
                this.handleButtonPress(e,addTodo);
              }}/>
            </form>
          );
        }}
      </Mutation>
    );
  }
}
