import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import _ from "lodash";
import { Link } from "react-router-dom";
import validate from "./validate";
import renderField from "../util/form-helper";
import renderSelectField from "../util/form-select-helper";
import renderDatePicker from "../util/date-picker";

class CheckInFirst extends Component {
  renderMyEldersList() {
    if (this.props.myelder == null) {
      return <option>Loading options...</option>;
    }
    const options = [
      <option key={0} value="">
        Select an elder...
      </option>
    ];
    return options.concat(
      _.map(this.props.myelder, elder => {
        return (
          <option key={elder.elder_id} value={elder.elder_id}>
            {elder.elder_fullname}
          </option>
        );
      })
    );
  }
  renderActivityTypes() {
    if (this.props.activityTypes == null) {
      return <option>Loading options...</option>;
    }
    const options = [
      <option key={0} value="">
        Select an activity...
      </option>
    ];
    return options.concat(
      this.props.activityTypes.map(type =>
        <option key={type.type_id} value={type.type_id}>
          {type.type_name}
        </option>
      )
    );
  }
  onSubmit(formProps) {
    this.props.nextPage();
  }
  render() {
    const { handleSubmit } = this.props;
    console.log(Object.getOwnPropertyNames(this.props.myelder).length);
    return (
      <div>
        <form
          className="sigin-form"
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
          <h3>Step 1</h3>
          <img src="assets/oldlady-icon.png" className="img-fluid signin-img" />
          <div>
            {Object.getOwnPropertyNames(this.props.myelder).length === 0 &&
              <div className="text-danger">
                Hmm... seems you don't have an elder in your list yet. Go {" "}
                <Link to="/addelder">here</Link> to get started.
              </div>}
            <Field
              label="Whom did you visit?"
              name="elder"
              component={renderSelectField}
              options={this.renderMyEldersList()}
            />
          </div>
          <img
            src="assets/Calendar-icon.png"
            className="img-fluid signin-img"
          />
          <div>
            <Field
              label="When was this?"
              name="date"
              component={renderDatePicker}
            />
          </div>
          <img src="assets/Visit-icon.png" className="img-fluid signin-img" />
          <div>
            <Field
              label="What type of activity?"
              name="activity_type"
              component={renderSelectField}
              options={this.renderActivityTypes()}
            />
          </div>
          <button type="submit" className="btn signin-btn btn-lg">
            Next
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    myelder: state.myelder,
    activityTypes: state.activity.activityTypes
  };
};

export default connect(mapStateToProps, null)(
  reduxForm({
    form: "checkin",
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate
  })(CheckInFirst)
);
