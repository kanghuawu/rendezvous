import React, { Component } from 'react';
import { connect } from 'react-redux';

import Volunteer from './volunteer';
import Elder from './elder';

class Profile extends Component {
  render() {
    return (
      <div>
          <Volunteer />
          <Elder />
      </div>

    );
  }
}

export default Profile;