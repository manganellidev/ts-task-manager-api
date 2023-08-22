import Result from '../../../domain/common/result.js';
import Email from '../../../domain/user/email.js';
import Password from '../../../domain/user/password.js';
import { IInputValidation } from './base-input-validation.js';

export interface IInputValues {
  [key: string]: unknown;
}

export default class LoginUserInputValidation {
  static validate(input: IInputValues): IInputValidation<Email | Password> {
    const { email, password } = input;

    const emailOrError = Email.create(email);
    const passwordOrError = Password.create(password);

    const inputValidationResult = Result.combine([emailOrError, passwordOrError]);

    return {
      inputValidationResult,
      resultsChecked: {
        emailOrError,
        passwordOrError
      }
    };
  }
}
