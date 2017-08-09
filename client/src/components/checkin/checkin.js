import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import * as actions from '../../actions';

const date = new Date();
console.log(date.setHours(0, 0, 0, 0));

class CheckIn extends Component {
  constructor (props) {
    super(props)
    this.state = {
      date: moment()
    };
    this.handleChange = this.handleChange.bind(this);
  }
  onSubmit(formProps) {
    console.log(this.state);
    console.log(formProps);
    // this.props.createActivity(formProps);
  }
  componentWillMount(){
    this.props.fetchMyEldersList();
    this.props.fetchActivityTypes();
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
    if (this.props.myelder == null) {
      return <div></div>;
    }
    const elder = this.props.myelder.map(elder => {
      return <option key={elder.match_id} name="type_id" value={elder.elder_id} >{elder.elder_fullname}</option>;
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
  renderDate() {
    return (
      <DatePicker dateFormat="YYYY-MM-DD" selected={this.state.date} onChange={this.handleChange} />
    );
  }
  handleChange(date) {
    this.setState({
      date: date
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div >
          <label>Elder Name</label>
          {this.renderMyEldersList()}
        </div>
        <div >
          <label>Date</label>
          <div>
            <Field name="date" component="input" type="text" className="form-control" />
            <DatePicker dateFormat="YYYY-MM-DD" selected={this.state.date} onChange={this.handleChange} className="form-control" />
          </div>
        </div>
        <div>
          <label>Activity Type</label>
          {this.renderActivityTypes()}
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


const mapStateToProps = (state) => {
  return { 
    activityTypes: state.auth.activityTypes, 
    myelder: state.myelder
  };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'checkin'
})(CheckIn));
