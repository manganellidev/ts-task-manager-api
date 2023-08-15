import GetUserService from '../../../application/user/get-user-service.js';
import MongoDbUserRepository from '../../../infrastructure/database/mongodb/repositories/mongo-db-user-repository.js';
import GetUserController from '../../../presentation/user/get-user-controller.js';

export default class GetUserControllerFactory {
    static make(userRepository: MongoDbUserRepository) {
        const getUserService = new GetUserService(userRepository);
        return new GetUserController(getUserService);
    }
}
