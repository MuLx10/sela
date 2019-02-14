import React, { Component } from 'react';
import './Profile.css';

class Profile extends Component {
  render() {
    const  profile  = this.props.profile;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
            <div header="Profile">
              <div className="im">
                <img src={profile.picture} alt="profile" />
                <h3>{profile.nickname}</h3>
              </div>
            </div>
        </div>
      </div>
    );
  }
}

export default Profile;
