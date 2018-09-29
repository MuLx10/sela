import React, { Component } from 'react';
import img from '../css/todo.svg';
import Profile from './Profile';
class Home extends Component {
  login() {
    this.props.auth.login();
  }
  render() {
    const { isAuthenticated } = this.props.auth;
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                <Profile auth={this.props.auth} />
              </h4>
            )
        }
        {
          !isAuthenticated() && (
            <div>
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{ cursor: 'pointer' }}
                  onClick={this.login.bind(this)}
                >
                  Log In
                </a>
                {' '}to continue.
              </h4>
              <div className="img_cont">
                <img src={img} alt="profile" />
              </div>
            </div>
            )
        }
      </div>
    );
  }
}

export default Home;
