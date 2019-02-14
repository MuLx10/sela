import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import img from '../layouts/todo.svg';


class Home extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
    if(this.props.auth.isAuthenticated())
      this.props.history.replace('/todo');

  }

  logout() {
    this.props.auth.logout();
  }
  render() {
    console.log(this.props);
    const { isAuthenticated } = this.props.auth; 

    if(this.props.auth.isAuthenticated())
      this.props.history.push('/todo');

    const mainContent = isAuthenticated() ? (
      <div >
        <p className="lead">
          <Link to="/todo">Click here</Link>{' '}to enter ur todo
        </p>
        <button className="btn waves-effect waves-light" onClick={this.logout.bind(this)}>Logout</button>
      </div>
    ) : (
      <div>
        <p className="lead">
          Login to continue....
        </p>
        <button className="btn waves-effect waves-light" onClick={this.login.bind(this)}>Login</button>
      </div>
    );

    
    return (
      <div className="jumbotron">
        <h1 className="display-4">Sela
          <img style={img_cnt} src={img} alt="profile" />
        </h1>
        {mainContent}
      </div>
    );
  }
}


const img_cnt={
  maxWidth: "50%",
  maxHeight: "50%",
  marginRight:"10%",
  marginLeft:"68%",
  position:'absolute',
  float:'right'
}


export default Home;





