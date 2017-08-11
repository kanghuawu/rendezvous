import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class History extends Component{
  componentWillMount(){
    this.props.fetchActivities();
  }
	
  renderHistoryList(activity) {
    return (
      <tr key={activity.activity_id}>
        <td>{activity.date}</td>
        <td>{activity.elder_fullname}</td>
      </tr>
    );
  }
  handleClickPrevious() {
    this.props.fetchActivities(this.props.activities.previous);
  }

  handleClickNext() {
    this.props.fetchActivities(this.props.activities.next);
  }

  render() {
  	if (this.props.activities == null) {
  		return <div>Loading...</div>;
  	}
    return (
      <div>
        <table className="table table-hover">
          <thead>
            <tr>
              <th>Date</th>
              <th>Elder</th>
            </tr>
          </thead>
          <tbody>
          {this.props.activities.results.map(this.renderHistoryList)}
          </tbody>
        </table>
        <button className="btn btn-default" disabled={!this.props.activities.previous} onClick={this.handleClickPrevious.bind(this)}>Previous</button>
        <button className="btn btn-default" disabled={!this.props.activities.next} onClick={this.handleClickNext.bind(this)}>Next</button>
      </div>
      
    )
  }
}

function mapStateToProps(state){
  return { activities: state.activity.activities };
}

export default connect(mapStateToProps, actions)(History);

