import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import moment from 'moment';

const renderDatePicker = ({input, placeholder, defaultValue, meta: {touched, error} }) => (
  <div>
    <DatePicker {...input} dateFormat="YYYY-MM-DD" selected={input.value ? moment(input.value, "YYYY-MM-DD") : null} />
    {touched && error && <span>{error}</span>}
  </div>
);

export default renderDatePicker