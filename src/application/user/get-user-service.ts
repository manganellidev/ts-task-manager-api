import { IUser } from '../../domain/user/user.js';
import BaseService from '../base-service.js';
import IUserRepository from './user-repository.js';
import { HTTPErrorType } from './util/http-error-type-enum.js';

export default class GetUserService extends BaseService<IUser> {
  constructor(private readonly userRepository: IUserRepository<IUser>) {
    super('GetUserService');
  }

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      return this.createErrorResponse(HTTPErrorType.NOT_FOUND, [
        new Error(`The user with id ${userId} cannot be found.`)
      ]);
    }

    return user;
  }
}
