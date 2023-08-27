import Validator from '../validator.js';

export default class IsEmailValidator extends Validator<string> {
  constructor() {
    super();
  }

  isValid(value: string) {
    const emailRegEx =
      /^[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-*\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/;

    if (!value) return false;

    const emailParts = value.split('@');

    if (emailParts.length !== 2) return false;

    const account = emailParts[0];
    const address = emailParts[1];

    if (account.length > 64) {
      return false;
    }

    if (address.length > 128) {
      return false;
    }

    const domainParts = address.split('.');

    if (domainParts.some((part) => part.length > 63)) {
      return false;
    }

    return !!value.match(emailRegEx);
  }

  errorMessage(property: unknown) {
    return `The ${property} should be an email.`;
  }
}
