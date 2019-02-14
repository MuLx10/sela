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
		profile:{
			sub:'0'
		}
	}
	componentWillMount() {
		const { userProfile, getProfile } = this.props.auth;
		if (!userProfile) {
			getProfile((err, profile) => {
			  this.setState({ profile });
			});
		} 
		else {
			this.setState({ profile: userProfile });
		}
	}
    render() {
    	const profile = this.state.profile;
		return (
			<React.Fragment>
				<ApolloProvider client={client}>
					<Profile profile={profile}/>
				    <Sela user_id={profile.sub} />
				</ApolloProvider>
			</React.Fragment>
			);
  }
}



export default TodoList;
