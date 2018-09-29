import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import QueryToDo from './queryToDo'
const todo_done = false;
const todo_value = "false";

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

const UpdateToDo = ({ user_id, todo_index, todo_value,todo_done,updateData }) => {
  let input;
  console.log("DOne till now"+user_id+todo_index+todo_value+todo_done);
  if (todo_done)
    input = "done";
  else
    input = "undone";
  return (
    <div className="undone">
      <Mutation mutation={MUTATE_UPDATE_TODO}>
        {starRepository => (
            <span className="glyphicon glyphicon-ok icon" 
                    onClick={e => {e.preventDefault();
                            updateData(user_id,todo_value);
                            console.log("updating");
                            starRepository({
                              variables: {
                                user_id: user_id,
                                todo_index: todo_index,
                                todo_value: todo_value,
                                todo_done: todo_done
                              }});}} />

        )}
      </Mutation>
      {todo_value}
      <Mutation mutation={MUTATE_DELETE_TODO}>
        {starRepository => (
            <button type="button" 
            onClick={e => {e.preventDefault();
                            console.log("deleting");
                            starRepository({
                              variables: {
                                user_id: user_id,
                                todo_index: todo_index,
                                todo_value: todo_value,
                              }});}}
                        className="close">\xD7</button>

        )}
      </Mutation>
    </div>
  );
};
export default UpdateToDo;
