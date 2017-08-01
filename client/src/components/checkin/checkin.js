import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';


class CheckIn extends Component {

  onSubmit(formProps) {
    console.log(formProps);
    this.props.createActivity(formProps);
  }
  componentWillMount(){
    this.props.fetchActivityTypes();
    this.props.fetchMyEldersList();
  }
  
  renderActivityTypes() {
    if (this.props.activityTypes == null) {
      return <div></div>;
    }
    const types = this.props.activityTypes.map(type => {
      return <option key={type.type_id} name="type_id" value={type.type_id} >{type.type_name}</option>;
    });
    return (
      <div>
        <Field label="Activity Type:" name="activity_type" component="select" className="form-control" >
          <option></option>
          {types}
        </Field>
      </div>
    );
  }

  renderMyEldersList() {
    if (this.props.myElderList == null) {
      return <div></div>;
    }
    const elder = this.props.myElderList.map(elder => {
      return <option key={elder.elder} name="type_id" value={elder.elder} >{elder.elder}</option>;
    });
    return (
      <div>
        <Field name="elder" component="select" type="number" className="form-control" >
          <option></option>
          {elder}
        </Field>
      </div>
    );
  }
  

  render() {
    const { handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div >
          <label>Elder Name</label>
          <div>
            {this.renderMyEldersList()}
          </div>
        </div>
        <div >
          <label>Date</label>
          <div>
            <Field name="date" component="input" className="form-control" />
          </div>
        </div>
        <div>
          <label>Activity Type</label>
          <div>
            {this.renderActivityTypes()}
          </div>
        </div>
        
        <div>
          <label>Duration (hours)</label>
          <div>
            <Field name="duration" component="input" type="number" className="form-control" />
          </div>
        </div>
        <div>
          <label>Status</label>
          <div>
            <Field name="status" component="select" type="number" className="form-control" >
              <option name="OK">OK</option>
              <option name="311">311</option>
              <option name="411">411</option>
              <option name="911">911</option>
            </Field>
          </div>
        </div>
        <button className="btn">Submit</button>
      </form>
    );
  }
}


function mapStateToProps(state) {
  return { 
    activityTypes: state.auth.activityTypes, 
    myElderList: state.auth.myElderList,
  };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'checkin'
})(CheckIn));
