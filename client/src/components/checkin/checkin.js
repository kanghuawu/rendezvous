import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';


class CheckIn extends Component {
  onSubmit(formProps) {
    // this.props.createActivity(formProps);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div >
          <label>Elder Name</label>
          <div>
            <Field name="elderName" component="input" type="text" className="form-control" />
          </div>
        </div>
        <div>
          <label>Activity Type</label>
          <div>
            <Field label="Activity Type:" name="activityType" component="select" className="form-control" >
              <option >Lunch</option>
              <option >Dinner</option>
            </Field>
          </div>
        </div>
        <div>
          <label>Duration</label>
          <div>
            <Field name="duration" component="input" type="number" className="form-control" />
          </div>
        </div>
  
        <button className="btn">Submit</button>
      </form>
    );
  }
}


export default connect(null, actions)(reduxForm({
  form: 'checkin'
})(CheckIn));
