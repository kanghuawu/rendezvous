import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import validate from './validate';
import renderDatePicker from './date-picker';
// import renderField from './render-field';

class CheckInFirst extends Component {
  renderMyEldersList() {
    if (this.props.myelder == null) {
      return <option>Loading options...</option>;
    }
    return this.props.myelder.map(elder => {
      return <option key={elder.elder_id} name="type_id" value={elder.elder_id} >{elder.elder_fullname}</option>;
    });
  }
  renderActivityTypes() {
    if (this.props.activityTypes == null) {
      return <option>Loading options...</option>;
    }
    return this.props.activityTypes.map(type => {
      return <option key={type.type_id} name="type_id" value={type.type_id} >{type.type_name}</option>;
    });
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
            <label>Who did you visit?</label>
            <Field name="elder" component="select" className="form-control" >
              <option></option>
              { this.renderMyEldersList() }
            </Field>
          </div>
          <div >
            <label>When was this?</label>
            <div className="form-control">
              <Field name="date" component={renderDatePicker} />
            </div>
          </div>
          <div >
            <label>What type of activity?</label>
            <div>
              <Field name="activity_type" component="select" className="form-control" >
                <option></option>
                { this.renderActivityTypes() }
              </Field>
            </div>
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
})(CheckInFirst));