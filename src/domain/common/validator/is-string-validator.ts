import Validator from '../validator.js';

export default class IsStringValidator extends Validator<unknown> {
  constructor() {
    super();
  }

  isValid(value: unknown) {
    return typeof value === 'string';
  }

  errorMessage(property: unknown) {
    return `The ${property} should be a string.`;
  }
}
