import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';
// import renderField from './render-field';

class CheckInThird extends Component {
  
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <div>
        <form onSubmit={ handleSubmit }>
          <label >Third Page</label>
          <Field name="status" component="select" type="number" className="form-control" >
            <option name="311">311</option>
            <option name="411">411</option>
            <option name="911">911</option>
          </Field>
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
})(CheckInThird);