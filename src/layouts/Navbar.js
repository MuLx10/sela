import React, { Component } from 'react';

class Navbar extends Component {
  goTo(route) {
    this.props.history.replace(`/${route}`)
  }

  login() {
    this.props.auth.login();
  }

  logout() {
    this.props.auth.logout();
  }
  render() {
    const { isAuthenticated } = this.props.auth; 
    return (
      <nav className="navbar navbar-expand-sm navbar-dark bg-dark mb-5">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarNav">
            <h2>Sela</h2>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                {
                  !isAuthenticated() && (
                  <button style={btnStyle} onClick={this.login.bind(this)}>Log In</button>)
                }
                {
                  isAuthenticated() && (
                    <button style={btnStyle} onClick={this.logout.bind(this)}> Log Out</button>)
                }
              </li>
              {' '}
              <li className="nav-item">
                {
                  isAuthenticated() && (
                      <button style={btnStyle} onClick={this.goTo.bind(this, 'home')}>Profile</button>)
                }
              </li>
            </ul>
          </div>
        </div>
      </nav>
    );
  }
}

const btnStyle = {
  color: '#fff',
  backgroundColor:'transparent',
  border:'none',
  padding:'4px 8px',
  borderRadius : '5%',
  cursor:'pointer',
}


export default Navbar;
