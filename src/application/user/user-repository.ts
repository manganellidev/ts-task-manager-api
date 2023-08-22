import { IUser } from '../../domain/user/user.js';
import IBaseRepository from '../base-repository.js';

export default interface IUserRepository<T> extends IBaseRepository<T> {
  findByCredentials(email: string, password: string): Promise<IUser | null>;
}
