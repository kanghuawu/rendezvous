import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import renderField from '../util/form-helper';
import { connect } from 'react-redux';

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
    )
  }
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({ 
  form: 'signin' 
})(SignIn));

