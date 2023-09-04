import { Age, Email, Name, Password } from '../../domain/user/user-value-objects.js';
import User, { IUser } from '../../domain/user/user.js';
import BaseService from '../base-service.js';
import IUserRepository from './user-repository.js';
import CreateUpdateUserInputValidation from './util/create-update-user-input-validation.js';
import { HTTPErrorType } from './util/http-error-type-enum.js';
import { InputType } from './util/input-type-enum.js';
import IsUserEmailUnique from './util/is-user-email-unique.js';
import UserInputKeysValidation from './util/user-input-keys-validation.js';

export default class CreateUserService extends BaseService<IUser> {
  constructor(private readonly userRepository: IUserRepository<IUser>) {
    super('CreateUserService');
  }

  async execute(createUserServiceInput: unknown) {
    const inputValidationKeysResult = UserInputKeysValidation.validate(
      InputType.CREATE_UPDATE,
      createUserServiceInput
    );

    if (!inputValidationKeysResult.isSuccess) {
      return this.createErrorResponse(HTTPErrorType.INVALID_INPUT, [
        inputValidationKeysResult.error as Error
      ]);
    }

    const { inputValidationResult, resultsChecked } =
      CreateUpdateUserInputValidation.validate(createUserServiceInput);

    if (!inputValidationResult.isSuccess) {
      return this.createErrorResponse(
        HTTPErrorType.INVALID_INPUT,
        inputValidationResult.error as Error[]
      );
    }

    const email = resultsChecked.emailOrError.value as Email;
    if (!(await IsUserEmailUnique.valdiate(this.userRepository, email, undefined))) {
      return this.createErrorResponse(HTTPErrorType.INVALID_INPUT, [
        new Error('The email informed is already taken.')
      ]);
    }

    const userToCreate = new User(
      resultsChecked.nameOrError.value as Name,
      resultsChecked.emailOrError.value as Email,
      resultsChecked.ageOrError.value as Age,
      resultsChecked.passwordOrError.value as Password
    );

    return this.userRepository.save(userToCreate);
  }
}
