import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { withAuth } from '@okta/okta-react';
import img from '../layouts/todo.svg';


export default withAuth(
  class Home extends Component {
    state = { authenticated: null };

    checkAuthentication = async () => {
      const authenticated = await this.props.auth.isAuthenticated();
      if (authenticated !== this.state.authenticated) {
        this.setState({ authenticated });
      }
    };

    async componentDidMount() {
      this.checkAuthentication();
    }

    async componentDidUpdate() {
      this.checkAuthentication();
    }

    login = async () => {
      this.props.auth.login('/');
    };

    logout = async () => {
      this.props.auth.logout('/');
    };

    render() {
      if (this.state.authenticated === null) return null;

      const mainContent = this.state.authenticated ? (
        <div >
          <p className="lead">
            <Link to="/todo">Click here</Link>
            to enter ur todo{' '}
          </p>
          <button className="btn btn-light btn-lg" onClick={this.logout}>Logout</button>
        </div>
      ) : (
        <div>
          <p className="lead">
            Login to continue....
          </p>
          <button className="btn btn-dark btn-lg" onClick={this.login}>Login</button>
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
);

const img_cnt={
  maxWidth: "20%",
  maxHeight: "20%",
  float:'right'
}