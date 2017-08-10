import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const renderDatePicker = (field) => {
  const { input, meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;
  return (
    <div className={className}>
      <label >{field.label}</label>
      <DatePicker {...input} dateFormat="YYYY-MM-DD" selected={input.value ? moment(input.value, "YYYY-MM-DD") : null}/>
      <div className="text-help">
        {touched ? error : ''}
      </div>
    </div> 
  );
}

export default renderDatePicker