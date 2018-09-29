import React from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";

const todo_done = false;
const todo_value = "false";

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
      affected_rows
    }
  }
`;

const Add = ({ user_id, todo_index }) => {
  let input;
  return (
    <div className="todoForm">
      <Mutation mutation={MUTATE_ADD_TODO}>
        {starRepository => (
          <form  ref="form"
            onSubmit={e => {
              e.preventDefault();
              starRepository({
                variables: {
                  user_id: user_id,
                  todo_value: input.value,
                  todo_index: todo_index,
                  todo_done: todo_done
                }
              });
              input.value = "";
            }}
            className="form-inline"
          >
            <input
              type="text"
              ref={node => {
                input = node;
              }}
              className="form-control"
              placeholder="add a new todo ..."
            />
            <button type="submit" className="btn btn-default" />
          </form>
        )}
      </Mutation>
    </div>
  );
};
export default Add;
