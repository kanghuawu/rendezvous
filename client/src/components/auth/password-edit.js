import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { updatePassword } from '../../actions';
import renderField from '../util/form-helper';

class UpdatePassword extends Component {
  handleFormSubmit(formProps) {
    this.props.updatePassword(formProps, () => this.props.history.push('/profile'));
  }
  renderAlert(){
    if(this.props.errorMessage){
      return(
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field 
          label="Password:" 
          name="old_password" 
          component={renderField} 
          type="password" 
        />
        <Field 
          label="New Password:" 
          name="new_password" 
          component={renderField} 
          type="password" 
        />
        <Field 
          label="New Password Confirm:" 
          name="new_passwordConfirm" 
          component={renderField} 
          type="password" 
        />
        <button action="submit" className="btn btn-primary">Submit</button>
        <Link to="/profile" className="btn btn-secondary">Cancel</Link>
      </form>
    );
  }
}

const validate = (value) => {
  const errors = {};
  if(!value.old_password){
    errors.old_password = 'Required';
  }
  if(!value.new_password){
    errors.new_password = 'Required';
  }
  if(!value.new_passwordConfirm){
    errors.new_passwordConfirm = 'Required';
  }
  if(value.new_password != value.new_passwordConfirm){
    errors.new_passwordConfirm = 'Password must match';
  }
  return errors;
}

export default connect(null, { updatePassword })(reduxForm({
  form: 'updatepassword',
  validate,
})(UpdatePassword));