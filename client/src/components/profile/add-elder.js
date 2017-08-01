import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyEldersList } from '../../actions';

class AddElder extends Component {
  
  render() {
    return <di>This is add elder</di>
  }
}

export default connect()(AddElder)