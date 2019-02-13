import React, { Component } from 'react';


class Profile extends Component {

  render() {
    console.log(this.props.user);
    return (
      <div style={prflStyle}>
        <h1>{this.props.user.currentUserName}</h1>
        <h3>{this.props.user.currentUserEmail}</h3>
      </div>
    );
  }
}

const prflStyle = {
  padding: "10px 100px",
  marginTop:"12%",
  position: "absolute"
}

export default Profile;
