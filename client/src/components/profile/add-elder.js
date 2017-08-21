import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { withRouter } from "react-router-dom";
import { reduxForm, Field } from "redux-form";
import { addEldersList } from "../../actions";
import CheckboxGroup from "./checkbox-group";

class AddElder extends Component {
  onSubmit(addElder, formProps) {
    if (addElder && formProps.addelders.length != 0) {
      alert("You just added " + formProps.addelders.length + " elder(s)!");
      this.props.addEldersList(formProps);
    }
  }
  renderSearchList() {
    return _.map(this.props.searchList, elder => {
      return {
        label: elder.first_name + " " + elder.last_name + " " + elder.phone,
        value: elder.elder_id.toString()
      };
    });
  }
  render() {
    const { handleSubmit, pristine, submitting } = this.props;
    const addElder = true;

    return (
      <div className="col-sm-12 col-md-9">
        <div className="card search-result">
          <div className="card-body">
            <h3>Result</h3>
            {this.props.searchList &&
              <form onSubmit={handleSubmit(this.onSubmit.bind(this, addElder))}>
                <CheckboxGroup
                  name="addelders"
                  options={this.renderSearchList()}
                />
                <button
                  className="btn btn-default"
                  disabled={pristine || submitting}
                >
                  Add To My List
                </button>
              </form>}
          </div>
        </div>
      </div>
    );
  }
}

const validate = values => {
  const errors = {};
  if (!values.addelders) {
    errors.addelders = "";
  } else if (values.addelders.length == 0) {
    errors.addelders = "Please select at least an elder";
  }
  return errors;
};

const mapStatesToProps = state => {
  return {
    searchList: state.search
  };
};

export default withRouter(
  connect(mapStatesToProps, { addEldersList })(
    reduxForm({
      form: "addmylist",
      validate
    })(AddElder)
  )
);
