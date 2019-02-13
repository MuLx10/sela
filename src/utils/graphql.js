import gql from "graphql-tag";

const QUERY_TODO = gql`
  query($user_id: String!) {
    todoos(where: { user_id: { _eq: $user_id } }) {
      todo_index
      todo_done
      todo_value
    }
  }
`;

const MUTATE_UPDATE_TODO = gql`
  mutation(
    $user_id: String!
    $todo_done: Boolean!
    $todo_index: Int!
  ) {
    update_todoos(
      _set: { todo_done: $todo_done}
      where: { user_id: { _eq: $user_id }, todo_index: { _eq: $todo_index } }
    ) {
      affected_rows
    }
  }
`;

const MUTATE_DELETE_TODO = gql`
  mutation($user_id: String!, $todo_index: Int!) {
    delete_todoos(
      where: {
        user_id: { _eq: $user_id }
        todo_index: { _eq: $todo_index }
      }
    ) {
      affected_rows
    }
  }
`;

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
      returning {
        todo_index
        todo_value
        todo_done
      }
    }
  }
`;

export { QUERY_TODO, MUTATE_ADD_TODO, MUTATE_DELETE_TODO, MUTATE_UPDATE_TODO };
