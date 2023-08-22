import Token from '../../domain/user/token.js';
import { IUser } from '../../domain/user/user.js';
import BaseService from '../base-service.js';
import IUserRepository from './user-repository.js';

export default class LogoutUserService extends BaseService<void> {
  constructor(private readonly userRepository: IUserRepository<IUser>) {
    super('LogoutUserService');
  }

  async execute(user: IUser): Promise<void> {
    user.token = Token.create('');
    await this.userRepository.update(user);
  }
}
