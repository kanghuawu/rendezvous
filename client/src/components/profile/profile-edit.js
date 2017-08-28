import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";

import renderField from "../util/form-helper";
import { fetchProfile, updateProfile } from "../../actions";

class ProfileEdit extends Component {
  componentWillMount() {
    this.props.fetchProfile();
    // console.log('profileedit', this.props)
  }
  // onSubmit(formProps) {
  //   this.props.updateProfile(formProps);
  // }
  render() {
    if (this.props.initialValues == null) {
      return <div className="loader" />;
    }
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <Field
              label="First Name"
              name="first_name"
              component={renderField}
              type="input"
              className="form-control"
            />
            <Field
              label="Last Name"
              name="last_name"
              component={renderField}
              type="input"
              className="form-control"
            />
            <Field
              label="Phone"
              name="phone"
              component={renderField}
              type="input"
              className="form-control"
            />
          </div>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    initialValues: state.profile
  };
}

export default connect(mapStateToProps, { fetchProfile }, null, {
  withRef: true
})(
  reduxForm({
    form: "updateprofile"
  })(ProfileEdit)
);
