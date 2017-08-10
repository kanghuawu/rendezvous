const validate = values => {
  const errors = {}
  if (!values.elder) {
    errors.elder = 'Required'
  }
  if (!values.date) {
    errors.date = 'Required'
  }
  if (!values.activity_type) {
    errors.activity_type = 'Required'
  }
  if (!values.duration) {
    errors.duration = 'Required'
  } else if (isNaN(Number(values.duration))) { 
    errors.duration = 'Must be a number';
  } else if (Number(values.duration) < 0) {
    errors.duration = 'It has to be a number greater than zero'
  }
  if (!values.dummyok) {
    errors.dummyok = 'Required'
  }
  if (!values.status) {
    errors.status = 'Required'
  }
  return errors
}

export default validate