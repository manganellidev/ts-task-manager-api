import Email from '../../../domain/user/email.js';
import { IUser } from '../../../domain/user/user.js';
import IUserRepository from '../user-repository.js';

export default class IsUserEmailUnique {
  static async valdiate(
    userRepository: IUserRepository<IUser>,
    email: Email,
    currentEmail: Email | undefined
  ) {
    if (currentEmail && currentEmail.equals(email)) {
      return true;
    }

    const user = await userRepository.find({ email: email.value });

    if (user && user.length) {
      return false;
    }

    return true;
  }
}
