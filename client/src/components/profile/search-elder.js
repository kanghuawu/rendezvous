import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { searchEldersList, clearSearch } from '../../actions';

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
    // console.log(this.props);
    this.props.clearSearch();
  }

  render() {
    const { handleSubmit } = this.props;
    const searchElder = true;
    return (
      <div>
        <h3>Search for Elder</h3>
         <form>
          <div>
            <Field placeholder="First Name" name="firstname" component="input" type="input" className="form-control" />
            <Field placeholder="Last Name" name="lastname" component="input" type="input" className="form-control" />
            <Field placeholder="Phone" name="phone" component="input" type="input" className="form-control" />
          </div>
          <button className="btn btn-primary" onClick={handleSubmit(this.onSubmit.bind(this, searchElder))}>Search</button>
          <button className="btn btn-default" onClick={this.onReset.bind(this)}>Reset</button>
         </form>
      </div>
    );
  }
}


export default connect(null, { searchEldersList, clearSearch })(reduxForm({
  form: 'searchelder'
})(SearchElder))