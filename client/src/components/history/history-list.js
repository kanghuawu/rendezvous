import React, { Component } from "react";
import { connect } from "react-redux";
import HistoryDetail from "./history-detail";
import * as actions from "../../actions";

class History extends Component {
  componentWillMount() {
    this.props.fetchActivities();
  }

  renderHistoryList(activity) {
    return (
      <li className="list-group-item" key={activity.activity_id}>
        <HistoryDetail {...activity} />
      </li>
    );
  }

  renderHistoryDetailList(activity) {
    return (
      <div>
        <HistoryDetail {...activity} />
      </div>
    );
  }

  render() {
    if (this.props.activities == null) {
      return <div className="loader" />;
    }
    return (
      <div>
        <img
          src="assets/history-clock-button.png"
          className="img-fluid signin-img"
        />
        <div className="card">
          <div className="card-body">
            <h3 className="card-title history-detail">Quick Summary</h3>
            <p className="card-text history-detail">Keep up the good work!</p>
            <ul className="history-detail">
              <li>
                Last Week: {this.props.activities.last_week || 0} hours
              </li>
              <li>
                Last Month: {this.props.activities.last_month || 0} hours
              </li>
            </ul>
            <h3 className="card-title history-detail">History Detail</h3>
            <p className="card-text history-detail">
              Click on the list to see the details.
            </p>
            <ul className="list-group">
              {this.props.activities.results.map(this.renderHistoryList)}
            </ul>
            <div className="history-btn">
              <button
                className="btn history-prev-btn"
                disabled={!this.props.activities.previous}
                onClick={() => {this.props.fetchActivities(this.props.activities.previous)}}
              >
                Previous
              </button>
              <button
                className="btn history-nxt-btn"
                disabled={!this.props.activities.next}
                onClick={() => {this.props.fetchActivities(this.props.activities.next)}}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { activities: state.activity.activities };
}

export default connect(mapStateToProps, actions)(History);
