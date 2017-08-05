import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchMyEldersList } from '../../actions';

class Elder extends Component {
  componentWillMount() {
    this.props.fetchMyEldersList();
  }
  renderMyElderList() {
    return this.props.myElderList.map((elder) => {
      return (
        <li
          key={elder.match_id}
          //onClick={() => this.props.selectActivity(activity.activity_id)}
          className="list-group-item">
          {elder.elder_fullname + " " + elder.elder_phone} 
        </li>
      )});
  }

  render() {
    if (this.props.myElderList == null) {
      return <div>Loaiding...</div>
    }
    return (
      <div>
        <h6>Your Elder List:</h6>
        <div>
          { this.renderMyElderList() }
        </div>       
      </div>
    );
  }
}

function mapStateToProps(state){
  return { myElderList: state.auth.myElderList }
}

export default connect(mapStateToProps, { fetchMyEldersList })(Elder);