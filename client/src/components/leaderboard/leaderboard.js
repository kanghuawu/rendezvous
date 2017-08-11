import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';

class LeaderBoard extends Component {
  componentWillMount(){
    this.props.fetchLeaderBoardList();
  }
  renderLeaderBoard(leaderboard){
    return (
      <tr key={leaderboard.leaderboard_id}>
        <td>{leaderboard.first_name}</td>
        <td>{leaderboard.hours}</td>
      </tr>
    );

  }
// 38: {this.renderLeaderBoard()}
  render() {
        if (this.props.leaderboard == null) {
      return <div>Loading...here</div>;
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
export default connect(mapStateToProps, actions)(LeaderBoard);

