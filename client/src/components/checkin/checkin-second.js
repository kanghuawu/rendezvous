import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, formValueSelector } from 'redux-form';
import renderField from '../util/form-helper';
import validate from './validate';

class CheckInSecond extends Component {
  constructor(props) {
    super(props);
  }
  onSubmit(formProps) {
    if (this.props.dummyok === "ok") {
      this.props.onSubmit(formProps);
      this.props.destroy();
    } else {
      this.props.nextPage();
    }
  }
  render() {
    const { handleSubmit, previousPage } = this.props;
    return (
      <div>
        <form onSubmit={ handleSubmit(this.onSubmit.bind(this)) }>
          <div >
            <Field 
              label="How Long? (hours)" 
              name="duration" 
              component={renderField} 
              type="number"
            />
          </div>
          <div>
            <label>How is the elder?</label>
            <div>
              <label>
                <Field name="dummyok" component="input" type="radio" value="ok" className="form-control" />OK
              </label>
              <br/>
              <label>
                <Field name="dummyok" component="input" type="radio" value="not" className="form-control" />Not OK
              </label>
            </div>
          </div>
          <button type="button" className="btn" onClick={previousPage}>Previous</button>
          {this.props.dummyok === "ok" && <button type="submit" className="btn">Reacy to Check In</button>}
          {this.props.dummyok === "not" && <button type="submit" className="btn">Not Ok? Add Some Note</button>}
        </form>
      </div>
    );
  }
}
const selector = formValueSelector('checkin');

const mapStateToProps = (state) => {
  return { 
    dummyok: selector(state, 'dummyok')
  };
}

export default connect(mapStateToProps, null)(reduxForm({
  form: 'checkin',
  destroyOnUnmount: false, // <------ preserve form data
  forceUnregisterOnUnmount: true, // <------ unregister fields on unmount
  validate
})(CheckInSecond));