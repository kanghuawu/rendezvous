import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { addEldersList } from '../../actions';
import CheckboxGroup from './checkbox-group';

class AddList extends Component {
  onSubmit(addElder, formProps) {
    if (addElder && formProps.addelders.length != 0) {
      this.props.addEldersList(formProps);
    }
  }
  renderSearchList() {
    return this.props.searchList.map((elder) => {
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
    searchList: state.auth.searchList
  });
}

export default connect(mapStatesToProps, { addEldersList })(reduxForm({
  form: 'addmylist'
})(AddList))