import Validator from '../validator.js';

export default class IsPositiveNumberValidator extends Validator<unknown> {
  constructor() {
    super();
  }

  isValid(value: number) {
    return value >= 0;
  }

  errorMessage(property: unknown) {
    return `The ${property} should be a positive number.`;
  }
}
