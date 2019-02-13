import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import TodoList from './pages/TodoList';
import './App.css';


class App extends Component {
  render() {
	return (
		<Router>
			<div className="App">
				<Navbar/>
				<div className="container">
					<Route exact path="/" component={Home}/>
					<Route exact path="/todo" component={TodoList}/>
				</div>
			</div>
		</Router>
	);
  }
}

export default App;