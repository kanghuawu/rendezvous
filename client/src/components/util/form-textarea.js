import React from 'react';

const renderTextArea = (field) => {
  const { meta: { touched, error } } = field;
  const className = `form-group ${touched && error ? 'has-danger' : ''}`;
  return (
    <div className={className}>
      <label>{field.label}</label>
      <textarea
        className="form-control is-valid"
        name={field.name}
        type={field.type}
        placeholder={field.placeholder}
        rows="5"
        {...field.input}
      />
      <div className="invalid-feedback">
        {touched ? error : ''}
      </div>
    </div>
  );
}

export default renderTextArea