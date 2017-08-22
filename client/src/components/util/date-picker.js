import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

const renderDatePicker = (field) => {
  const { input, meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;
  return (
    <div className={className}>
      <label >{field.label}</label>
      <DatePicker {...input} className="form-control is-valid" dateFormat="YYYY-MM-DD" selected={input.value ? moment(input.value, "YYYY-MM-DD") : null}/>
      <div className="error">
        {touched ? error : ''}
      </div>
    </div> 
  );
}

export default renderDatePicker