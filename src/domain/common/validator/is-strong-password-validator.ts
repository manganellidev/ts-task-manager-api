import Validator from '../validator.js';

export default class IsStrongPasswordValidator extends Validator<string> {
  constructor() {
    super();
  }

  isValid(value: string) {
    const hasMinLength = (value: string) => value.length >= 10;
    const hasMinSymbols = (value: string) => value.match(/[!@#$%^&*]/g);
    const hasMinLowercase = (value: string) => value.match(/[a-z]/g);
    const hasMinUppercase = (value: string) => value.match(/[A-Z]/g);
    const hasMinNumbers = (value: string) => value.match(/[0-9]/g);

    return !!(
      hasMinLength(value) &&
      hasMinSymbols(value) &&
      hasMinLowercase(value) &&
      hasMinUppercase(value) &&
      hasMinNumbers(value)
    );
  }

  errorMessage(property: unknown) {
    return `The ${property} must be at least 10 characters long, and contain at least one number, one lowercase letter, one uppercase letter, and one symbol.`;
  }
}
