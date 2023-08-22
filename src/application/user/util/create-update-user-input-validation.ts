import Result from '../../../domain/common/result.js';
import Age from '../../../domain/user/age.js';
import Email from '../../../domain/user/email.js';
import Name from '../../../domain/user/name.js';
import Password from '../../../domain/user/password.js';
import { IInputValidation } from './base-input-validation.js';

export default class CreateUpdateUserInputValidation {
  static validate(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    input: any,
    passwordGenerateHash = true
  ): IInputValidation<Name | Age | Email | Password> {
    const { name, email, age, password } = input;

    const nameOrError = Name.create(name);
    const emailOrError = Email.create(email);
    const ageOrError = Age.create(age);
    const passwordOrError = Password.create(password, passwordGenerateHash);

    const inputValidationResult = Result.combine([
      nameOrError,
      emailOrError,
      ageOrError,
      passwordOrError
    ]);

    return {
      inputValidationResult,
      resultsChecked: {
        nameOrError,
        emailOrError,
        ageOrError,
        passwordOrError
      }
    };
  }
}
