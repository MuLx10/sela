import React from 'react';
import { Mutation } from "react-apollo";
import gql from 'graphql-tag';


const MUTATE_UPDATE_TODO = gql`
  mutation( $user_id: String!,
            $todo_done: Boolean!,
            $todo_index: Int!,
            $todo_value: String!)
  {
    update_todoos(_set:{todo_done:$todo_done, todo_index:$todo_index } where :{user_id:{_eq:$user_id}, todo_value:{_eq:$todo_value}})
    {
      affected_rows
    }
  }
`;


const MUTATE_DELETE_TODO = gql`
mutation( $user_id: String!,
          $todo_index:Int!,
          $todo_value: String!)
{
  delete_todoos(where :{user_id:{_eq:$user_id}, todo_value:{_eq:$todo_value}, todo_index:{_eq:$todo_index}})
  {
    affected_rows
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
const user_id = "1";

const handleTodoToggle = (toggleTodo, todo) => {
  toggleTodo({
    variables: {
          user_id: user_id,
          todo_index: todo.todo_index,
          todo_value: todo.todo_value,
          todo_done: todo.todo_done
                              
    },
    update: (cache, { data: { update_todo }}) => {
      const data = cache.readQuery({ query: QUERY_TODO, variables:{user_id:user_id}})
      const toggledTodo = data.todoos.find(t => t.todo_index === todo.todo_index)
      toggledTodo.todo_done = !todo.todo_done;
      cache.writeQuery({
            query: QUERY_TODO,
            variables: {user_id:user_id},
            data
      })
    }
  })
}

const handleTodoDelete = (deleteTodo, todo) => {
  console.log("handleTodoDelete "+JSON.stringify(todo));
  deleteTodo({
    variables: {
      user_id: user_id,
      todo_index: todo.todo_index,
      todo_value: todo.todo_value,
    },
    update: (cache, { data: { update_todo }}) => {
      const data = cache.readQuery({ query: QUERY_TODO, variables:{user_id:user_id} })
      data.todoos = data.todoos.filter(t => {
        return t.todo_value !== todo.todo_value
      })
      cache.writeQuery({
            query: QUERY_TODO,
            variables: {user_id:user_id},
            data
      })
    }
  })
}

const Todo = ({ todo }) => (
  <Mutation mutation={MUTATE_UPDATE_TODO}>
    {(updateTodo) => {
      return (
        <div className="parentContainer">
          <li className="todoItem"
            onClick={e => {
              handleTodoToggle(updateTodo, todo)
            }}>
            {
              todo.todo_done ?
                <strike className="todoLabel">{todo.todo_value}</strike> :
                <label className="todoLabel">{todo.todo_value}</label>
            }
            <Mutation mutation={MUTATE_DELETE_TODO}>
              {(deleteTodo) => {
                return (
                  <button className="deleteLabel"
                    onClick={e => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleTodoDelete(deleteTodo, todo)
                    }}>
                    Delete
                  </button>
                )
              }}
            </Mutation>
          </li>
        </div>
      )
    }}
  </Mutation>
)

export default Todo;