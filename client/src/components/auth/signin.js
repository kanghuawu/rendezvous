import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { signInUser, clearAuthError } from "../../actions";
import renderField from "../util/form-helper";
import RenderAlert from "./auth-alert";

class SignIn extends Component {
  handleFormSubmit = ({ email, password }) => {
    this.props.signInUser({ email, password }, () =>
      this.props.history.push("/checkin")
    );
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
                        label="E-Mail"
                        placeholder="E-Mail"
                        name="email"
                        component={renderField}
                        type="email"
                      />
                      <Field
                        label="Password"
                        placeholder="Password"
                        name="password"
                        component={renderField}
                        type="password"
                      />
                      <RenderAlert/>
                      <button type="submit" className="btn signin-btn btn-lg">
                        Sign In
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
            <Link to="/signup" className="create-new-account">
              Create New Account
            </Link>
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
    errors.email = "Required";
  }
  if (!value.password) {
    errors.password = "Required";
  }
  return errors;
};


export default connect(null, { signInUser, clearAuthError })(
  reduxForm({
    form: "signin",
    validate
  })(SignIn)
);
