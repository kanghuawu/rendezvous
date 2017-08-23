import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { signUpUser, clearAuthError } from "../../actions";
import renderField from "../util/form-helper";
import RenderAlert from "./auth-alert";


class SignUp extends Component {
  
  handleFormSubmit = (formProps) => {
    this.props.signUpUser(formProps, () => this.props.history.push("/checkin"));
  }

  componentWillUnmount() {
    this.props.clearAuthError();
  }

  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="container signin-container">
        <div className="row">
          <div className="col" />
          <div className="col-sm-12 col-md-8">
            <div className="card signin-card">
              <div className="card-body">
                <img
                  src="assets/LBFE-logo-small.png"
                  className="img-fluid signin-img"
                />
                <div className="row">
                  <div className="col-sm-12 col-lg-3" />
                  <div className="col-sm-12 col-lg-6">
                    <form
                      className="sigin-form"
                      onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}
                    >
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
                      <RenderAlert/>
                      <button action="submit" className="btn signin-btn btn-lg">
                        Sign up!
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col" />
        </div>
      </div>
    );
  }
}

const validate = value => {
  const errors = {};
  if (!value.email) {
    errors.email = "Please enter an email";
  }
  if (!value.password) {
    errors.password = "Please enter a password";
  }
  if (!value.passwordConfirm) {
    errors.passwordConfirm = "Please enter a password confirmation";
  }
  if (value.password != value.passwordConfirm) {
    errors.passwordConfirm = "Password must match";
  }
  return errors;
};

export default connect(null, { signUpUser, clearAuthError })(
  reduxForm({
    form: "signup",
    validate
  })(SignUp)
);
