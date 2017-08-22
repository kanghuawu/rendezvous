import React, { Component } from "react";
import { connect } from "react-redux";
import { reduxForm, Field } from "redux-form";
import renderField from "../util/form-helper";
import { searchEldersList, clearSearch } from "../../actions";

class SearchElder extends Component {
  componentWillMount() {
    this.props.clearSearch();
  }
  onSubmit(searchElder, formProps) {
    if (searchElder) {
      if (formProps.firstname == null) {
        formProps.firstname = "";
      }
      if (formProps.lastname == null) {
        formProps.lastname = "";
      }
      if (formProps.phone == null) {
        formProps.phone = "";
      }
      this.props.searchEldersList(formProps);
    }
  }
  onReset() {
    // this.props.clearSearch();
    this.props.reset();
  }

  render() {
    const { handleSubmit } = this.props;
    const searchElder = true;
    return (
      <div className="col-sm-12 col-md-3">
        <div className="card signin-card">
          <div className="card-body">
            <h3 className="card-title">Search</h3>
            <form>
              <div>
                <Field
                  label="First Name"
                  placeholder="ex. James"
                  name="firstname"
                  component={renderField}
                  type="input"
                />
                <Field
                  label="Last Name"
                  placeholder="ex. Jordan"
                  name="lastname"
                  component={renderField}
                  type="input"
                />
                <Field
                  label="Phone"
                  placeholder="ex. 6668889999"
                  name="phone"
                  component={renderField}
                  type="input"
                />
              </div>
              <button
                className="btn profile-btn"
                onClick={handleSubmit(this.onSubmit.bind(this, searchElder))}
              >
                Search
              </button>{" "}
              <button className="btn btn-default" onClick={this.props.reset}>
                Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { searchEldersList, clearSearch })(
  reduxForm({
    form: "searchelder"
  })(SearchElder)
);
