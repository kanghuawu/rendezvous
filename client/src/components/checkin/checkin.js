import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';


class CheckIn extends Component {
  constructor(props) {
    super(props);
  }

  onSubmit(formProps) {
    // this.props.createActivity(formProps);
  }
  componentWillMount(){
    this.props.fetchActivityTypes();
  }
  
  renderActivityTypes() {
    if (this.props.activityTypes == null) {
      return <div></div>;
    }
    const types = this.props.activityTypes.map(type => {
      return <option name="type_id" value={type.type_id} >{type.type_name}</option>;
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
  

  render() {
    const { handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <div >
          <label>Elder Name</label>
          <div>
            <Field name="elder" component="input" type="text" className="form-control" />
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
            <Field name="duration" component="select" type="number" className="form-control" >
              <option></option>
              <option name={1}>1</option>
              <option name={2}>2</option>
              <option name={3}>3</option>
              <option name={4}>Above 4</option>
            </Field>
          </div>
        </div>
        <div>
          <label>Status</label>
          <div>
            <Field name="duration" component="select" type="number" className="form-control" >
              <option></option>
              <option name={1}>1</option>
              <option name={2}>2</option>
              <option name={3}>3</option>
              <option name={4}>Above 4</option>
            </Field>
          </div>
        </div>
        <button className="btn">Submit</button>
      </form>
    );
  }
}


function mapStateToProps(state) {
  return { activityTypes: state.auth.activityTypes };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'checkin'
})(CheckIn));
