import React, { Component } from "react";
import { reduxForm, Field } from "redux-form";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import * as actions from "../../actions";
import renderField from "../util/form-helper";

class SignIn extends Component {
  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  handleFormSubmit = ({ email, password }) => {
    this.props.signInUser({ email, password }, () =>
      this.props.history.push("/checkin")
    );
  };

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
                      {this.renderAlert()}
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

const mapStateToProps = state => {
  return { errorMessage: state.auth.error };
};

export default connect(mapStateToProps, actions)(
  reduxForm({
    form: "signin",
    validate
  })(SignIn)
);
