
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';

import { ApolloProvider } from 'react-apollo';
import { ApolloClient, HttpLink, InMemoryCache } from 'apollo-boost';
import QueryToDo from './App';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://sela.herokuapp.com/v1alpha1/graphql' }),
  cache: new InMemoryCache()
});

const AppWithProvider = () => (

  <ApolloProvider client={client}>
    <QueryToDo user_id="1"/>
  </ApolloProvider>
);


ReactDOM.render(<AppWithProvider />, document.getElementById('root'));
registerServiceWorker();

