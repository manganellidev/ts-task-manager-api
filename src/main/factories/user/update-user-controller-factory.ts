import UpdateUserService from '../../../application/user/update-user-service.js';
import MongoDbUserRepository from '../../../infrastructure/database/mongodb/repositories/mongo-db-user-repository.js';
import UpdateUserController from '../../../presentation/user/update-user-controller.js';

export default class UpdateUserControllerFactory {
    static make(userRepository: MongoDbUserRepository) {
        const updateUserService = new UpdateUserService(userRepository);
        return new UpdateUserController(updateUserService);
    }
}
