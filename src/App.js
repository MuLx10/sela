import React,{Component} from 'react';
import { Redirect, Route, Router} from 'react-router-dom';

import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import Callback from './auth/Callback';
import Auth from './auth/Auth';
import history from './history';

import './App.css';


const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}


class App extends Component {
  render() {
	return (
		<Router history={history}>
        <div>
          <Route path="/" render={(props) => <Navbar auth={auth} {...props} />} />
          <Route path="/home" render={(props) => <Home auth={auth} {...props} />} />
          <Route path="/todo" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/home"/>
            ) : (
              <TodoList auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>        
        </div>
      </Router>
	);
  }
}

export default App;