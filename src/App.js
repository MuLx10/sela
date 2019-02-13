import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Security, SecureRoute, ImplicitCallback } from '@okta/okta-react';

import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import Login from './auth/Login';
import './App.css';


function onAuthRequired({ history }) {
  history.push('/login');
}


class App extends Component {
  render() {
	return (
		<Router>
			<Security
	          issuer="https://dev-995249.oktapreview.com/oauth2/default"
	          client_id="0oajdcfnxrlbqVH4V0h7"
	          redirect_uri={window.location.origin + '/implicit/callback'}
	          onAuthRequired={onAuthRequired}>
				<div className="App">
					<Navbar/>
					<div className="container">
						<Route exact path="/" component={Home}/>
						<SecureRoute exact path="/todo" component={TodoList}/>
						<Route path="/login"
			                render={() => (
			                  <Login baseUrl="https://dev-995249.oktapreview.com" />
			                )}
			              />
						<Route path="/implicit/callback" component={ImplicitCallback} />
					</div>
				</div>
			</Security>
		</Router>
	);
  }
}

export default App;