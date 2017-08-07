import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProfile, fetchMyEldersList } from '../../actions';

class Volunteer extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }
  
  render() {
    if (this.props.profile == null ) {
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
      </div>

    );
  }
}

function mapStateToProps(state){
  return { 
    profile: state.auth.profile,
  }
}

export default connect(mapStateToProps, { fetchProfile, fetchMyEldersList })(Volunteer);