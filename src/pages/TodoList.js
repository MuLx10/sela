import React,{Component} from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import Sela from "./Sela";

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://selagql.herokuapp.com/v1alpha1/graphql' }),
  cache: new InMemoryCache(),
});

class TodoList extends Component {
  render() {
    return (
    	<ApolloProvider client={client}>
    	  <Sela user_id={"0"} />
    	</ApolloProvider>
    );
  }
}
export default TodoList;
