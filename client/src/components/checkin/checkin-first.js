import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';
import renderField from '../util/form-helper';
import renderSelectField from '../util/form-select-helper';
import renderDatePicker from '../util/date-picker';

class CheckInFirst extends Component {
  renderMyEldersList() {
    if (this.props.myelder == null) {
      return <option>Loading options...</option>;
    }
    const options = [<option key={0} value="">Select an elder...</option>];
    return options.concat(this.props.myelder.map(elder => 
      <option key={elder.elder_id} value={elder.elder_id} >{elder.elder_fullname}</option>));
  }
  renderActivityTypes() {
    if (this.props.activityTypes == null) {
      return <option>Loading options...</option>;
    }
    const options = [<option key={0} value="">Select an activity...</option>];
    return options.concat(this.props.activityTypes.map(type =>
      <option key={type.type_id} value={type.type_id} >{type.type_name}</option>));
  }
  onSubmit(formProps) {
    this.props.nextPage();
  }
  render() {
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div >
            <Field 
              label="Who did you visit?" 
              name="elder"
              component={renderSelectField} 
              options={this.renderMyEldersList()} 
            />
          </div>
          <div >
            <Field 
              label="When was this?" 
              name="date" 
              component={renderDatePicker}
            />
          </div>
          <div >
            <Field 
              label="What type of activity?" 
              name="activity_type" 
              component={renderSelectField} 
              options={this.renderActivityTypes()} 
            />
          </div>
          <button type="submit" className="btn">Next</button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { 
    myelder: state.myelder,
    activityTypes: state.activity.activityTypes
  };
}

export default connect(mapStateToProps, null)(reduxForm({
  form: 'checkin',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(CheckInFirst));