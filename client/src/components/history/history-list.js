import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class History extends Component{
  componentWillMount(){
    this.props.fetchActivities();
  }
	
  renderList() {
    return this.props.activities.results.map((activity) => {
      return (
          <li
            key={activity.activity_id}
            //onClick={() => this.props.selectActivity(activity.activity_id)}
            className="list-group-item">
            {activity.date} - {activity.elder_fullname}
          </li>
        );
    });
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
        {this.renderList()}
        <button className="btn btn-default" disabled={!this.props.activities.previous} onClick={this.handleClickPrevious.bind(this)}>Previous</button>
        <button className="btn btn-default" disabled={!this.props.activities.next} onClick={this.handleClickNext.bind(this)}>Next</button>
      </div>
      
    )
  }
}

function mapStateToProps(state){
  return { activities: state.auth.activities}
}

export default connect(mapStateToProps, actions)(History);

