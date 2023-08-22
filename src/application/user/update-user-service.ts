/* eslint-disable @typescript-eslint/no-explicit-any */
import Age from '../../domain/user/age.js';
import Email from '../../domain/user/email.js';
import Name from '../../domain/user/name.js';
import Password from '../../domain/user/password.js';
import { IUser } from '../../domain/user/user.js';
import { IUserDTO, mapUserFromEntityToDTO } from '../../presentation/user/util/user-dto-mapper.js';
import BaseService from '../base-service.js';
import IUserRepository from './user-repository.js';
import CreateUpdateUserInputValidation from './util/create-update-user-input-validation.js';
import UserInputKeysValidation from './util/user-input-keys-validation.js';
import { HTTPErrorType } from './util/http-error-type-enum.js';
import { InputType } from './util/input-type-enum.js';
import IsUserEmailUnique from './util/is-user-email-unique.js';

export default class UpdateUserService extends BaseService<IUser> {
  constructor(private readonly userRepository: IUserRepository<IUser>) {
    super('UpdateUserService');
  }

  async execute(updateUserServiceInput: unknown, user: IUser) {
    const inputValidationKeysResult = UserInputKeysValidation.validate(
      InputType.CREATE_UPDATE,
      updateUserServiceInput
    );

    if (!inputValidationKeysResult.isSuccess) {
      return this.createErrorResponse(HTTPErrorType.INVALID_INPUT, [
        inputValidationKeysResult.error as Error
      ]);
    }

    const userToBeUpdated = mapUserFromEntityToDTO(user);
    let isPasswordUpdated = false;
    const updates = Object.keys(updateUserServiceInput as object) as (keyof IUserDTO)[];
    updates.forEach((key) => {
      if (key === 'password') {
        isPasswordUpdated = true;
      }
      userToBeUpdated[key] = (updateUserServiceInput as IUserDTO)[key as never];
    });

    const { inputValidationResult, resultsChecked } = CreateUpdateUserInputValidation.validate(
      userToBeUpdated,
      isPasswordUpdated
    );

    if (!inputValidationResult.isSuccess) {
      return this.createErrorResponse(
        HTTPErrorType.INVALID_INPUT,
        inputValidationResult.error as Error[]
      );
    }

    const email = resultsChecked.emailOrError.value as Email;
    if (!(await IsUserEmailUnique.valdiate(this.userRepository, email, user.email))) {
      return this.createErrorResponse(HTTPErrorType.INVALID_INPUT, [
        new Error('The email informed is already taken.')
      ]);
    }

    user.name = resultsChecked.nameOrError.value as Name;
    user.email = resultsChecked.emailOrError.value as Email;
    user.age = resultsChecked.ageOrError.value as Age;
    user.password = resultsChecked.passwordOrError.value as Password;

    return this.userRepository.update(user);
  }
}
