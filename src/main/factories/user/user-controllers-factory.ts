import MongoDbUserRepository from '../../../infrastructure/database/mongodb/repositories/mongo-db-user-repository.js';
import { IBaseController, IHTTPRequest } from '../../../presentation/base-controller.js';
import CreateUserControllerFactory from './create-user-controller-factory.js';
import DeleteUserControllerFactory from './delete-user-controller-factory.js';
import GetUserControllerFactory from './get-user-controller-factory.js';
import LoginUserControllerFactory from './login-user-controller-factory.js';
import MongoDbUserRespositoryFactory from './mongo-db-user-repository-factory.js';
import UpdateUserControllerFactory from './update-user-controller-factory.js';

export default class UserControllersFactory {
  static make(): [IBaseController<IHTTPRequest, unknown>[], MongoDbUserRepository] {
    const userRepository = MongoDbUserRespositoryFactory.make();
    const userControllers = [
      CreateUserControllerFactory.make(userRepository),
      GetUserControllerFactory.make(userRepository),
      UpdateUserControllerFactory.make(userRepository),
      DeleteUserControllerFactory.make(userRepository),
      LoginUserControllerFactory.make(userRepository)
    ];
    return [userControllers, userRepository];
  }
}
