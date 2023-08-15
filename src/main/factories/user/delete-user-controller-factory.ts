import DeleteUserService from '../../../application/user/delete-user-service.js';
import MongoDbUserRepository from '../../../infrastructure/database/mongodb/repositories/mongo-db-user-repository.js';
import DeleteUserController from '../../../presentation/user/delete-user-controller.js';

export default class DeleteUserControllerFactory {
    static make(userRepository: MongoDbUserRepository) {
        const deleteUserService = new DeleteUserService(userRepository);
        return new DeleteUserController(deleteUserService);
    }
}
