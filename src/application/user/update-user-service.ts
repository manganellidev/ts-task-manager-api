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
import { HTTPTypeError } from './util/type-error-enum.js';

export default class UpdateUserService extends BaseService<IUser> {
  constructor(private readonly userRepository: IUserRepository<IUser>) {
    super('UpdateUserService');
  }

  async execute(updateUserServiceInput: unknown, user: IUser) {
    const inputValidationFieldsResult =
      CreateUpdateUserInputValidation.validateFieldsKeys(updateUserServiceInput);

    if (!inputValidationFieldsResult.isSuccess) {
      return this.createErrorResponse(HTTPTypeError.INVALID_INPUT, [
        inputValidationFieldsResult.error as Error
      ]);
    }

    const userToBeUpdated = mapUserFromEntityToDTO(user);
    const updates = Object.keys(updateUserServiceInput as object) as (keyof IUserDTO)[];
    updates.forEach((key) => {
      userToBeUpdated[key] = (updateUserServiceInput as IUserDTO)[key as never];
    });

    const { inputValidationResult, resultsChecked } =
      CreateUpdateUserInputValidation.validate(userToBeUpdated);

    if (!inputValidationResult.isSuccess) {
      return this.createErrorResponse(
        HTTPTypeError.INVALID_INPUT,
        inputValidationResult.error as Error[]
      );
    }

    user.name = resultsChecked.nameOrError.value as Name;
    user.email = resultsChecked.emailOrError.value as Email;
    user.age = resultsChecked.ageOrError.value as Age;
    user.password = resultsChecked.passwordOrError.value as Password;

    return this.userRepository.update(user);
  }
}
