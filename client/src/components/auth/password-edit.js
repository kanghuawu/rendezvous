import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import { updatePassword } from '../../actions';
import { renderField } from './form-helper';

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
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Submit</button>
        <Link to="/profile" className="btn btn-secondary">Cancel</Link>
      </form>
    );
  }
}


export default connect(null, { updatePassword })(reduxForm({
  form: 'updatepassword'
})(UpdatePassword));