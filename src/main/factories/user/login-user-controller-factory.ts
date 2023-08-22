import LoginUserService from '../../../application/user/login-user-service.js';
import MongoDbUserRepository from '../../../infrastructure/database/mongodb/repositories/mongo-db-user-repository.js';
import LoginUserController from '../../../presentation/user/login-user-controller.js';

export default class LoginUserControllerFactory {
  static make(userRepository: MongoDbUserRepository) {
    const loginUserService = new LoginUserService(userRepository);
    return new LoginUserController(loginUserService);
  }
}
