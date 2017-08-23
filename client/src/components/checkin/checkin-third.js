import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import renderField from '../util/form-helper';
import renderTextArea from '../util/form-textarea';
import renderSelectField from '../util/form-select-helper';
import validate from './validate';
// import renderField from './render-field';
import sadFaceIcon from "../../../assets/sad-face.png";
import noteIcon from "../../../assets/note.png";

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
        <form className="sigin-form" onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <h3>Step 3</h3>
          <img src={sadFaceIcon} className="img-fluid signin-img" />
          <div >
            <Field 
              label="NOT OK? What's the elder's status?" 
              name="status" 
              component={renderSelectField} 
              options={this.renderStatus()} 
            />
            <img src={noteIcon} className="img-fluid signin-img" />
            <Field 
              label="Can you add some notes?" 
              name="notes"
              placeholder="Optional" 
              component={renderTextArea} 
              type="textarea"
            />
          </div>
          <button type="button" className="btn checkin-prev-btn btn-lg" onClick={previousPage}>Previous</button>
          <button type="submit" className="btn checkin-nxt-btn btn-lg">Check In</button>
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