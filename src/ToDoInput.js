import React from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';

const todo_done = false;
const todo_value = "false";
const todo_index = 25;

const MUTATE_ADD_TODO = gql`
  mutation(
    $user_id: String!
    $todo_index: Int!
    $todo_done: Boolean!
    $todo_value: String!
  ) {
    insert_todoos(
      objects: {
        user_id: $user_id
        todo_done: $todo_done
        todo_index: $todo_index
        todo_value: $todo_value
      }
    ) {
      returning{
        todo_index,
        todo_value,
        todo_done
      }
    }
  }
`;

const QUERY_TODO = gql`
  query($user_id:String!){
  todoos (where:{user_id:{_eq:$user_id}}){
    todo_index
    todo_done
    todo_value
  }
}
`;



export default class TodoInput extends React.Component {

  constructor() {
    super();
    this.state = {
      textboxValue: '',
      todo_index:0,
      todo_done:false
    }
  }

  handleTextboxValueChange = (e) => {
    this.setState({
      ...this.state,
      textboxValue: e.target.value
    });
  }

  handleTextboxKeyPress = (e, addTodo) => {
    if (e.key === 'Enter') {
      const newTask = this.state.textboxValue;
      const user_id = this.props.user_id;
      addTodo({
        variables: {
                  user_id: user_id,
                  todo_value: newTask,
                  todo_index: this.state.todo_index,
                  todo_done: this.state.todo_done
        },
        update: (store, { data: { insert_todoos }}) => {
          const data = store.readQuery({ query: QUERY_TODO, variables:{user_id:user_id} })
          const insertedTodo = insert_todoos.returning;
          // console.log(insert_todoos.returning);
          data.todoos.splice(0, 0, insertedTodo[0])
          store.writeQuery({
            query: QUERY_TODO,
            variables: {user_id:user_id},
            data
          })
          this.setState({
            ...this.state,
            textboxValue: '',
            todo_index:this.state.todo_index+1
          });
        }
      })
    }
  }
  handleButtonPress = (addTodo) => {
      const newTask = this.state.textboxValue;
      const user_id = this.props.user_id;
      addTodo({
        variables: {
                  user_id: user_id,
                  todo_value: newTask,
                  todo_index: this.state.todo_index,
                  todo_done: this.state.todo_done
        },
        update: (store, { data: { insert_todoos }}) => {
          const data = store.readQuery({ query: QUERY_TODO, variables:{user_id:user_id} })
          const insertedTodo = insert_todoos.returning;
          // console.log(insert_todoos.returning);
          data.todoos.splice(0, 0, insertedTodo[0])
          store.writeQuery({
            query: QUERY_TODO,
            variables: {user_id:user_id},
            data
          })
          this.setState({
            ...this.state,
            textboxValue: '',
            todo_index:this.state.todo_index+1
          });
        }
      })
  }
  render() {
    return (
      <Mutation mutation={MUTATE_ADD_TODO}>
        {(addTodo, { data, loading, called, error }) => {
          return (
            <div className="todoForm">
              <form  ref="form" className="form-inline"
                  onSubmit={e => {
                  this.handleButtonPress(addTodo);
                }}>
              <input className="form-control" placeholder="Add a todo" 
              onKeyPress={e => { this.handleTextboxKeyPress(e, addTodo); }} 
              onChange={this.handleTextboxValueChange}  
              value={this.state.textboxValue}/>
              <button type="submit" className="btn btn-default" />
          </form>
            </div>
          )
        }}
      </Mutation>
    )
  }
}