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
            {activity.date} - {activity.volunteer}
          </li>
        );
    });
  }

  render() {
  	if (this.props.activities == null) {
  		return <div>Loading...</div>;
  	}
    return (
      <div>{this.renderList()}</div>
    )
  }
}

function mapStateToProps(state){
  return { activities: state.auth.activities}
}

export default connect(mapStateToProps, actions)(History);

