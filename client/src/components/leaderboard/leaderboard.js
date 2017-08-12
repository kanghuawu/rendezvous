import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import {fetchLeaderBoardList} from '../../actions';

class LeaderBoard extends Component {
  componentWillMount(){
    this.props.fetchLeaderBoardList();
  }
  renderLeaderBoard(board){
    return (
      <tr key={board.leaderboard_id}>
        <td>{board.first_name}</td>
        <td>{board.hours}</td>
      </tr>
    );

  }
// 38: {this.renderLeaderBoard()}
  render() {
        if (this.props.leaderboard == null) {
      return <div>Loading...</div>;
    }
    return (
      <div>
         <h3>LeaderBoard List:</h3>
          <table className="table table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Hours</th>
            </tr>
          </thead>
          <tbody>
          {this.props.leaderboard.map(this.renderLeaderBoard)}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    leaderboard: state.leaderboard
  }
}
export default connect(mapStateToProps, {fetchLeaderBoardList})(LeaderBoard);

