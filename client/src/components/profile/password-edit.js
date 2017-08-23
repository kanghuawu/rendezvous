import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import { Link } from "react-router-dom";
import { updatePassword } from "../../actions";
import renderField from "../util/form-helper";
import RenderAlert from "../auth/auth-alert";

class PasswordEdit extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit}>
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
        <RenderAlert />
      </form>
    );
  }
}

const validate = value => {
  const errors = {};
  if (!value.old_password) {
    errors.old_password = "Required";
  }
  if (!value.new_password) {
    errors.new_password = "Required";
  }
  if (!value.new_passwordConfirm) {
    errors.new_passwordConfirm = "Required";
  }
  if (value.new_password != value.new_passwordConfirm) {
    errors.new_passwordConfirm = "Password must match";
  }
  return errors;
};

export default connect(null, null, null, { withRef: true })(
  reduxForm({
    form: "updatepassword",
    validate
  })(PasswordEdit)
);
