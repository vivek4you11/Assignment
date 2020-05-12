const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateItemsInput = data => {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.field = !isEmpty(data.field) ? data.field : '';
  data.value = !isEmpty(data.value) ? data.value : '';

  if (!Validator.isLength(data.name, { min: 2, max: 40 })) {
    errors.name = 'Name should be more than 2 characters and max 40 characters!';
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = 'Name field is required!';
  }

  if (Validator.isEmpty(data.field)) {
    errors.field = 'Field is required!';
  }

  if (!Validator.isLength(data.value, { min: 4, max: 100 })) {
    errors.value = 'Value should be more than 4 characters and max 100 characters!';
  }

  if (Validator.isEmpty(data.value)) {
    errors.value = 'Value field is required!';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
