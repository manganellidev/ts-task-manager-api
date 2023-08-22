import LogoutUserService from '../../../application/user/logout-user-service.js';
import MongoDbUserRepository from '../../../infrastructure/database/mongodb/repositories/mongo-db-user-repository.js';
import LogoutUserController from '../../../presentation/user/logout-user-controller.js';

export default class LogoutUserControllerFactory {
  static make(userRepository: MongoDbUserRepository) {
    const loginUserService = new LogoutUserService(userRepository);
    return new LogoutUserController(loginUserService);
  }
}
