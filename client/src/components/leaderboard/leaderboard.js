import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { fetchLeaderBoardList } from "../../actions";
import Loader from "../util/loader-circle";
import leaderboardIcon from "../../../assets/leaderboard.png";

class LeaderBoard extends Component {
  constructor(props) {
    super(props);
    this.renderLeaderBoard = this.renderLeaderBoard.bind(this);
  }
  componentWillMount() {
    this.props.fetchLeaderBoardList();
  }

  renderLeaderBoard() {
    return this.props.leaderboard.map((board, index) => {
      return (
        <tr key={index}>
          <td>
            {index + 1}
          </td>
          <td>
            {board.volunteer_fullname}
          </td>
          <td>
            {board.hours}
          </td>
          <td>
            {board.volunteer__hearts}
          </td>
          <td>
            {board.volunteer__badges}
          </td>
        </tr>
      );
    });
  }

  render() {
    if (this.props.leaderboard == null ) {
      return <Loader/>;
    }
    return (
      <div>
        <img src={leaderboardIcon} className="img-fluid signin-img" />
        <div className="card">
          <div className="card-body card-leaderboard">
            <h2 className="card-title history-detail">LeaderBoard List (Last Month)</h2>
            <table className="table table-hover history-detail">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Hours</th>
                  <th>Hearts</th>
                  <th>Badges</th>
                </tr>
              </thead>
              <tbody>
                {this.renderLeaderBoard()}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    leaderboard: state.leaderboard
  };
};
export default connect(mapStateToProps, { fetchLeaderBoardList })(LeaderBoard);
