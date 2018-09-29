import React from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import TodoInput from "./ToDo/ToDoInput";
import ToDoList from "./ToDo/ToDoList";

// import { setContext } from 'apollo-link-context'
// const authLink = setContext((_, { headers }) => {
//   const token = 'peri';
//   console.log(token);
//   return {
//     headers: {
//       ...headers,
//       'X-Hasura-Access-Key':token
//     }
//   }
// })


// const client = new ApolloClient({
//   link: authLink.concat(new HttpLink({ uri: 'https://selagql.herokuapp.com/v1alpha1/graphql' })),
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://selagql.herokuapp.com/v1alpha1/graphql' }),
  cache: new InMemoryCache(),
});

const Sela = ({ user_id, todo_index }) => (
  <ApolloProvider client={client}>
    <div className="todoForm">
      <h3 className="title">To Do List</h3>
      <TodoInput user_id={user_id} todo_index={todo_index} />
      <ToDoList user_id={user_id} />
    </div>
  </ApolloProvider>
);

export default Sela;
