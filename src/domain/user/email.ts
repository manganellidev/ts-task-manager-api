import Result from '../common/result.js';
import IsEmailValidator from '../common/validator/is-email-validator.js';
import IsStringValidator from '../common/validator/is-string-validator.js';
import ValueObject from '../common/value-object.js';

export default class Email extends ValueObject<string> {
  private constructor(_email: string) {
    super(_email);
  }

  static create(email: unknown) {
    const isStringValidator = new IsStringValidator();
    if (!isStringValidator.isValid(email)) {
      return Result.fail(new Error(isStringValidator.errorMessage(email)));
    }

    const isEmailValidator = new IsEmailValidator();
    if (!isEmailValidator.isValid(email as string)) {
      return Result.fail(new Error(isEmailValidator.errorMessage(email)));
    }

    return Result.ok<Email>(new Email(email as string));
  }
}
