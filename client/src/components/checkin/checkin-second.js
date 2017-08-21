import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field, formValueSelector } from "redux-form";
import renderField from "../util/form-helper";
import validate from "./validate";

class CheckInSecond extends Component {
  constructor(props) {
    super(props);
  }
  onSubmit(formProps) {
    if (this.props.dummyok === "ok") {
      this.props.onSubmit(formProps);
      this.props.destroy();
    } else {
      this.props.nextPage();
    }
  }
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <div>
        <form
          className="sigin-form"
          onSubmit={handleSubmit(this.onSubmit.bind(this))}
        >
          <h3>Step 2</h3>
          <div>
            <img src="assets/clock.png" className="img-fluid signin-img" />
            <Field
              label="How Long? (hours)"
              name="duration"
              component={renderField}
              type="number"
            />
          </div>
          <div className="form-group">
            <label>How was the elder?</label>
            <div>
              <div className="row">
                <label className="form-check-label">
                  <Field
                    name="dummyok"
                    component="input"
                    type="radio"
                    value="ok"
                    className="form-check-input"
                  />{" "}
                  OK
                </label>
                <img
                  src="assets/happy-granny.png"
                  className="img-fluid signin-img"
                />
              </div>

              <div className="row">
                <label className="form-check-label">
                  <Field
                    name="dummyok"
                    component="input"
                    type="radio"
                    value="not"
                    className="form-check-input"
                  />{" "}
                  Not OK
                </label>
                <img
                  src="assets/upset-granny.png"
                  className="img-fluid signin-img"
                />
                {this.props.dummyok === "not" &&
                  <div className="text-danger">
                    Not OK? We are worried. Please add some notes at next step.
                  </div>}
              </div>
            </div>
          </div>
          <button
            type="button"
            className="btn checkin-prev-btn btn-lg"
            onClick={previousPage}
          >
            Previous
          </button>
          {this.props.dummyok === "ok" &&
            <button type="submit" className="btn checkin-nxt-btn btn-lg">
              Check In
            </button>}
          {this.props.dummyok === "not" &&
            <button type="submit" className="btn checkin-nxt-btn btn-lg">
              Add Note
            </button>}
        </form>
      </div>
    );
  }
}
const selector = formValueSelector("checkin");

const mapStateToProps = state => {
  return {
    dummyok: selector(state, "dummyok")
  };
};

export default connect(mapStateToProps, null)(
  reduxForm({
    form: "checkin",
    destroyOnUnmount: false, // <------ preserve form data
    forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
    validate,
  })(CheckInSecond)
);
