import React,{Component} from "react";
import { ApolloProvider } from "react-apollo";
import { ApolloClient, HttpLink, InMemoryCache } from "apollo-boost";
import Sela from "./Sela";
import Profile from "../layouts/Profile";

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://selagql.herokuapp.com/v1alpha1/graphql' }),
  cache: new InMemoryCache(),
});

class TodoList extends Component {
	state = {
	    currentUserName: '',
	    currentUserEmail: ''
	};
	componentDidMount() {
		const idToken = JSON.parse(localStorage.getItem('okta-token-storage'));
		console.log(localStorage.getItem('okta-token-storage'));
		this.setState({
		  currentUserEmail: idToken.idToken.claims.email,
		  currentUserName: idToken.idToken.claims.name
		});
	}
  render() {
		return (
				<React.Fragment>
					<ApolloProvider client={client}>
						<Profile user={this.state}/>
					  <Sela user_id={this.state.currentUserEmail} />
					</ApolloProvider>
				</React.Fragment>
			);
  }
}



export default TodoList;
