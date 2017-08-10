import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import renderSelectField from '../util/form-select-helper';
import validate from './validate';
// import renderField from './render-field';

class CheckInThird extends Component {
  renderStatus() {
    return [
      <option key={0} value="">Select elder's status...</option>,
      <option key={1} value="311">311</option>,
      <option key={2} value="411">411</option>,
      <option key={3} value="911">911</option>,
    ];
  }
  onSubmit(formProps) {
    this.props.onSubmit(formProps);
    this.props.destroy();
  }
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <div>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <div >
            <Field 
              label="What's the elder's status?" 
              name="status" 
              component={renderSelectField} 
              options={this.renderStatus()} 
            />
          </div>
          <button type="button" className="btn" onClick={previousPage}>Previous</button>
          <button type="submit" className="btn">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({
  form: 'checkin',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(CheckInThird);