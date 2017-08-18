import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { fetchProfile, updateProfile } from '../../actions';


class ProfileEdit extends Component {
  componentWillMount() {
    this.props.fetchProfile();
  }
  onSubmit(formProps) {
    this.props.updateProfile(formProps);
    
  }
  render() {
    if (this.props.initialValues == null) {
      return <div>Loading...</div>;
    }
    const { handleSubmit } = this.props;
    return (
      <div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <div>
            <label>First Name:</label>
            <div>
              <Field name="first_name" component="input" type="input" className="form-control" />  
            </div>
            <label>Last Name:</label>
            <div>
              <Field name="last_name" component="input" type="input" className="form-control" />  
            </div>
            <label>Phone:</label>
            <div>
              <Field name="phone" component="input" type="input" className="form-control" />  
            </div>
          </div>
          <button className="btn btn-primary">Update</button>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state){
  return { 
    initialValues: state.profile,
  };
}

export default connect(mapStateToProps, { fetchProfile, updateProfile })(reduxForm({ 
  form: 'updateprofile'
})(ProfileEdit));