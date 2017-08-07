import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchLeaderBoard } from '../actions';

class LeaderBoard extends Component {
getLeaderBoard()
{
  this.props.fetchLeaderBoard();
}
  render() {
    return (
      <div>
        <button onClick={this.getLeaderBoard.bind(this)} type="button">Refresh</button>
      </div>
    );
  }
}

export default connect(mapStateToProps, { fetchLeaderBoard})(LeaderBoard);