import CreateUserService from '../../../application/user/create-user-service.js';
import MongoDbUserRepository from '../../../infrastructure/database/mongodb/repositories/mongo-db-user-repository.js';
import CreateUserController from '../../../presentation/user/create-user-controller.js';

export default class CreateUserControllerFactory {
  static make(userRepository: MongoDbUserRepository) {
    const createUserService = new CreateUserService(userRepository);
    return new CreateUserController(createUserService);
  }
}
