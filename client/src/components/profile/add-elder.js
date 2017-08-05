import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { searchEldersList } from '../../actions';
import AddList from './add-mylist';

class AddElder extends Component {
  onSubmit(searchElder, formProps) {
    if (searchElder) {
      if (formProps.firstname == null) {
        formProps.firstname = "";
      }
      if (formProps.lastname == null) {
        formProps.lastname = "";
      }
      if (formProps.phone == null) {
        formProps.phone = "";
      }
      this.props.searchEldersList(formProps);
    }
  }
  render() {
    const { handleSubmit } = this.props;
    const searchElder = true;
    return (
      <div>
         <form onSubmit={handleSubmit(this.onSubmit.bind(this, searchElder))}>
          <div>
            <Field name="firstname" default="''" component="input" type="input" className="form-control" />
            <Field name="lastname" default="''" component="input" type="input" className="form-control" />
            <Field name="phone" default="''" component="input" type="input" className="form-control" />
          </div>
          <button className="btn">Search</button>
         </form>
         <AddList />
      </div>
    );
  }
}


export default connect(null, {searchEldersList})(reduxForm({
  form: 'addelder'
})(AddElder))