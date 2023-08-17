import Validator from '../validator.js';
import IsEmail from 'validator/lib/isEmail.js';

export default class IsEmailValidator extends Validator<unknown> {
  constructor() {
    super();
  }

  isValid(value: unknown) {
    return IsEmail.default(value + '');
  }

  errorMessage(property: unknown) {
    return `The ${property} should be an email.`;
  }
}
