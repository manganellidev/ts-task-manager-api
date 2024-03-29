import Result from '../common/result.js';
import IsNullOrUndefinedValidator from '../common/validator/is-null-or-undefined-validator.js';
import IsNumberValidator from '../common/validator/is-number-validator.js';
import IsPositiveNumberValidator from '../common/validator/is-positive-number-validator.js';
import ValueObject from '../common/value-object.js';

export default class Age extends ValueObject<number> {
  private constructor(_age: number) {
    super(_age);
  }

  static create(age: unknown) {
    const isNullOrUndefinedValidator = new IsNullOrUndefinedValidator();
    if (isNullOrUndefinedValidator.isValid(age)) {
      return Result.ok<Age>(new Age(0));
    }

    const isNumberValidator = new IsNumberValidator();
    if (!isNumberValidator.isValid(age)) {
      return Result.fail(new Error(isNumberValidator.errorMessage(age)));
    }

    const isPositiveNumberValidator = new IsPositiveNumberValidator();
    if (!isPositiveNumberValidator.isValid(age as number)) {
      return Result.fail(new Error(isPositiveNumberValidator.errorMessage(age)));
    }

    return Result.ok<Age>(new Age(age as number));
  }
}
