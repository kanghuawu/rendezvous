import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchProfile, fetchMyEldersList } from '../../actions';

class Profile extends Component {
  componentWillMount() {
    this.props.fetchProfile();
    this.props.fetchMyEldersList();
  }
  renderProfile() {
    if (this.props.profile == null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div>
          <h6>Your Name:</h6>
          <p>
            { this.props.profile.first_name + " " + this.props.profile.last_name}
          </p>
          <h6>You earned</h6>
          <p>
            { "Hearts: " + this.props.profile.hearts + " Badges: " + this.props.profile.badges}
          </p>
        </div>
        <div>
          <Link to="/profile/edit" >Update Profile</Link>
          <Link to="/password" >Update Password</Link>
        </div>
      </div>
    );
  }
  renderMyElderList(elder) {
    return (
      <tr key={elder.match_id}>
        <td>{elder.elder_fullname}</td>
        <td>{elder.elder_phone}</td>
      </tr>
    );
  }
  render() {
    if (this.props.profile == null || this.props.myelder == null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <h3>Profile</h3>
        {this.renderProfile()}
        <h3>Elder List:</h3>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
          {this.props.myelder.map(this.renderMyElderList)}
          </tbody>
        </table>
        <Link to="/addelder">Add an Elder</Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    profile: state.profile,
    myelder: state.myelder
  }
}

export default connect(mapStateToProps, { fetchProfile, fetchMyEldersList })(Profile);