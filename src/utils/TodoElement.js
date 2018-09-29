import React from 'react';
import { Mutation } from "react-apollo";
import {
  QUERY_TODO,
  MUTATE_DELETE_TODO,
  MUTATE_UPDATE_TODO
} from './graphql';


const handleTodoToggle = (toggleTodo, todo,user_id) => {
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

const handleTodoDelete = (deleteTodo, todo, user_id) => {
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

const TodoElement = ({ todo,user_id }) => (
  <Mutation mutation={MUTATE_UPDATE_TODO}>
    {(updateTodo) => {
      return (
        <div className="parentContainer">
          <li className="todoItem"
            onClick={e => {
              handleTodoToggle(updateTodo, todo, user_id)
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
                      handleTodoDelete(deleteTodo, todo, user_id)
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

export default TodoElement;