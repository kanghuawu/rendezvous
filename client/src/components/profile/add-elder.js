import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { withRouter } from 'react-router-dom'
import { reduxForm, Field } from 'redux-form';
import { addEldersList } from '../../actions';
import CheckboxGroup from './checkbox-group';

class AddElder extends Component {
  onSubmit(addElder, formProps) {
    if (addElder && formProps.addelders.length != 0) {
      this.props.addEldersList(formProps, () => this.props.history.push('/profile'));
    }
  }
  renderSearchList() {
    return _.map(this.props.searchList, elder => {
      return ({
        label: elder.first_name + " " + elder.last_name + " " + elder.phone,
        value: elder.elder_id.toString()
      })
    });
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const addElder = true;
    if (this.props.searchList == null) {
      return <div></div>;
    }
    return (
      <div>
        <h3>Add an Elder to your List</h3>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this, addElder))}>
          <CheckboxGroup name="addelders" options={this.renderSearchList()} />
          <button className="btn btn-default" disabled={pristine || submitting} >Add Elders To My List</button>
        </form>
      </div>
    );
  }
}



function mapStatesToProps(state) {
  return ({
    searchList: state.search
  });
}

export default withRouter(connect(mapStatesToProps, { addEldersList })(reduxForm({
  form: 'addmylist'
})(AddElder)));