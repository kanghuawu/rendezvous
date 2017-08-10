import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class LeaderBoard extends Component {
  constructor (props) {
    super(props)
    //this.handleChange = this.handleChange.bind(this);
  }
getLeaderBoard()
{
  this.props.fetchLeaderBoardList();
}
  render() {
    return (
      <div>
        <button onClick={this.getLeaderBoard.bind(this)} type="button">Refresh</button>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return { 
 
  };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'leaderboard'
})(LeaderBoard));