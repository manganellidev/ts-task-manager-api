import Age from '../../domain/user/age.js';
import Email from '../../domain/user/email.js';
import Name from '../../domain/user/name.js';
import Password from '../../domain/user/password.js';
import User, { IUser } from '../../domain/user/user.js';
import BaseService from '../base-service.js';
import IUserRepository from './user-repository.js';
import CreateUpdateUserInputValidation from './util/create-update-user-input-validation.js';
import { HTTPTypeError } from './util/type-error-enum.js';

export default class CreateUserService extends BaseService<IUser> {
    constructor(private readonly userRepository: IUserRepository<IUser>) {
        super('CreateUserService');
    }

    async execute(createUserServiceInput: unknown) {
        const { inputValidationResult, resultsChecked } =
            CreateUpdateUserInputValidation.validate(createUserServiceInput);

        if (!inputValidationResult.isSuccess) {
            return this.createErrorResponse(
                HTTPTypeError.INVALID_INPUT,
                inputValidationResult.error as Error[]
            );
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
