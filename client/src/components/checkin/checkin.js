import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import PropTypes from 'prop-types'
import CheckInFirst from './checkin-first';
import CheckInSecond from './checkin-second';
import CheckInThird from './checkin-third';
import { fetchMyEldersList, fetchActivityTypes, createActivity } from '../../actions';


class CheckIn extends Component {
  constructor(props) {
    super(props);
    this.nextPage = this.nextPage.bind(this);
    this.previousPage = this.previousPage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = { page: 1};
  }

  nextPage() {
    this.setState({ page: this.state.page + 1 });
  }

  previousPage() {
    this.setState({ page: this.state.page - 1 });
  }
  
  componentWillMount(){
    this.props.fetchMyEldersList();
    this.props.fetchActivityTypes();
  }
  onSubmit(formProps, dispatch) {
    this.props.createActivity(formProps, () => {
      this.props.history.push('/checkinfinished');
    });
  }
  
  render() {
    const { onSubmit } = this.props;
    const { page } = this.state;
    return (
      <div>
        {page === 1 && <CheckInFirst nextPage={this.nextPage}/> }
        {page === 2 && <CheckInSecond previousPage={this.previousPage} nextPage={this.nextPage} onSubmit={this.onSubmit} /> }
        {page === 3 && <CheckInThird previousPage={this.previousPage} nextPage={this.nextPage} onSubmit={this.onSubmit} /> }
      </div>
    );
  }
}


const mapStateToProps = (state) => {
  return { 
    activityTypes: state.activity.activityTypes
  };
}

export default connect(null, { fetchMyEldersList, fetchActivityTypes, createActivity })(CheckIn);
