import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../actions';
import renderField from '../util/form-helper';


class SignIn extends Component {
  renderAlert(){
    if(this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  handleFormSubmit = ({ email, password }) => {
    this.props.signInUser({ email, password }, () => this.props.history.push('/profile'));
  }

  render() {
    const { handleSubmit } = this.props
    return (
      <div class="container signin-container">
        <div class="row">
          <div class="col"></div>
          <div class="col-sm-12 col-md-8">
            <div class="card signin-card">
              <div class="card-block">
                <img src="assets/LBFE-logo.png" class="img-fluid signin-img" />
                <div className="col-sm-12 col-lg-6 offset-lg-2">
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
                    {this.renderAlert()}
                    <button type="submit" className="btn btn-primary">Sign In</button>
                  </form>
                </div>
              </div>
              <Link to="/signup" class="create-new-account">Create New Account</Link>
            </div>
            <div class="col"></div>
          </div>
        </div>
      </div>
    );
  }
}

const validate = (value) => {
  const errors = {};
  if(!value.email){
    errors.email = 'Required';
  }
  if(!value.password){
    errors.password = 'Required';
  }
  return errors;
}

const mapStateToProps = (state) => {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({ 
  form: 'signin',
  validate
})(SignIn));

