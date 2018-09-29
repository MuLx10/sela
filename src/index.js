
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import Add from './addToDo';
import TodoInput from './ToDoInput'
import ToDoList from './queryToDo'
import "./style.css"



const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://sela.herokuapp.com/v1alpha1/graphql' }),
  cache: new InMemoryCache()
});

var user_id = "1";
var todo_index = 1;


const AppWithProvider = () => (

  <ApolloProvider client={client}>
    <TodoInput user_id={user_id}/>
    <ToDoList user_id={user_id}/>
  </ApolloProvider>
);


ReactDOM.render(<AppWithProvider />, document.getElementById('root'));
registerServiceWorker();

