import React, { Component } from 'react';
import { Panel } from 'react-bootstrap';
import '../css/Profile.css';
import Sela from '../Sela';

var todo_index = 1;

class Profile extends Component {
  componentWillMount() {
    this.setState({ profile: {} });
    const { userProfile, getProfile } = this.props.auth;
    if (!userProfile) {
      getProfile((err, profile) => {
        this.setState({ profile });
      });
    } else {
      this.setState({ profile: userProfile });
    }
  }
  render() {
    const { profile } = this.state;
    return (
      <div className="container">
        <div className="profile-area">
          <h1>{profile.name}</h1>
            <Panel header="Profile">
              <div className="im">
                <img src={profile.picture} alt="profile" />
                <h3>{profile.nickname}</h3>
                
              </div>
              <div className="sela">
                <br/>
                <Sela user_id={profile.sub} todo_index={todo_index}/>
              </div>
            </Panel>
        </div>
      </div>
    );
  }
}

export default Profile;
