import Result from '../common/result.js';
import IsStrongPasswordValidator from '../common/validator/is-strong-password-validator.js';
import ValueObject from '../common/value-object.js';
import bcryptjs from 'bcryptjs';

export default class Password extends ValueObject<string> {
  private constructor(_password: string) {
    super(_password);
  }

  static create(password: unknown) {
    const isStrongPassowrdValidator = new IsStrongPasswordValidator();
    if (!isStrongPassowrdValidator.isValid(password + '')) {
      return Result.fail(new Error(isStrongPassowrdValidator.errorMessage(password)));
    }

    password = Password.generateHash(password as string);

    return Result.ok<Password>(new Password(password as string));
  }

  static generateHash(password: string) {
    return bcryptjs.hashSync(password, 8);
  }
}
