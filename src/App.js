import React from "react";
import ReactDOM from "react-dom";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import TodoInput from "./ToDoInput";
import ToDoList from "./ToDoList";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://sela.herokuapp.com/v1alpha1/graphql" }),
  cache: new InMemoryCache()
});

const App = ({ user_id, todo_index }) => (
  <ApolloProvider client={client}>
    <div className="todoForm">
      <h3 className="title">To Do List</h3>
      <TodoInput user_id={user_id} todo_index={todo_index} />
      <ToDoList user_id={user_id} />
    </div>
  </ApolloProvider>
);

export default App;
