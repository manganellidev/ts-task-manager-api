import { IUser } from '../../domain/user/user.js';
import BaseService from '../base-service.js';
import IUserRepository from './user-repository.js';
import { HTTPErrorType } from './util/http-error-type-enum.js';

export default class DeleteUserService extends BaseService<boolean> {
  constructor(private readonly userRepository: IUserRepository<IUser>) {
    super('DeleteUserService');
  }

  async execute(userId: string) {
    const wasDeleted = await this.userRepository.deleteById(userId);

    if (!wasDeleted) {
      return this.createErrorResponse(HTTPErrorType.NOT_FOUND, [
        new Error(`The user with id ${userId} cannot be found.`)
      ]);
    }

    return true;
  }
}
