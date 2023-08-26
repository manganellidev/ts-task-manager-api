import { IUser } from '../../domain/user/user.js';
import BaseService from '../base-service.js';
import IUserRepository from './user-repository.js';
import UserInputKeysValidation from './util/user-input-keys-validation.js';
import { HTTPErrorType } from './util/http-error-type-enum.js';
import { InputType } from './util/input-type-enum.js';
import LoginUserInputValidation, { IInputValues } from './util/login-user-input-validation.js';
import Email from '../../domain/user/email.js';
import Password from '../../domain/user/password.js';
import Token from '../../domain/user/token.js';

export default class LoginUserService extends BaseService<IUser> {
  constructor(private readonly userRepository: IUserRepository<IUser>) {
    super('LoginUserService');
  }

  async execute(loginUserServiceInput: unknown) {
    const inputValidationFieldsResult = UserInputKeysValidation.validate(
      InputType.LOGIN,
      loginUserServiceInput
    );

    if (!inputValidationFieldsResult.isSuccess) {
      return this.createErrorResponse(HTTPErrorType.INVALID_INPUT, [
        inputValidationFieldsResult.error as Error
      ]);
    }

    const { inputValidationResult, resultsChecked } = LoginUserInputValidation.validate(
      loginUserServiceInput as IInputValues
    );

    if (!inputValidationResult.isSuccess) {
      return this.createErrorResponse(
        HTTPErrorType.INVALID_INPUT,
        inputValidationResult.error as Error[]
      );
    }

    const email = (resultsChecked.emailOrError.value as Email).value;
    const password = (resultsChecked.passwordOrError.value as Password).value;
    const user = await this.userRepository.findByCredentials(email, password);

    if (!user) {
      return this.createErrorResponse(HTTPErrorType.UNAUTHORIZED, [
        new Error('Unable to login with provided credentials.')
      ]);
    }

    user.token = Token.createAndSign(user.id).value;
    await this.userRepository.update(user);

    return user;
  }
}
