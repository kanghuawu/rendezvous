import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import renderField from '../util/form-helper';
import { connect } from 'react-redux';

class SignUp extends Component {
  handleFormSubmit(formProps) {
    this.props.signUpUser(formProps, () => this.props.history.push('/checkin'));
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
          label="E-Mail:" 
          name="email" 
          component={renderField} 
          type="email" 
        />
        <Field 
          label="Password:" 
          name="password" 
          component={renderField} 
          type="password" 
        />
        <Field 
          label="Confirm Password:" 
          name="passwordConfirm" 
          component={renderField} 
          type="password" 
        />
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up!</button>
      </form>
    );
  }
}

const validate = (value) => {
  const errors = {};
  if(!value.email){
    errors.email = 'Please enter an email';
  }
  if(!value.password){
    errors.password = 'Please enter a password';
  }
  if(!value.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation';
  }
  if(value.password != value.passwordConfirm){
    errors.passwordConfirm = 'Password must match';
  }
  return errors;
}

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signup',
  validate
})(SignUp));
