import { Model } from 'mongoose';
import { UserModel } from '../../../infrastructure/database/mongodb/models/user-model.js';
import MongoDbUserRepository from '../../../infrastructure/database/mongodb/repositories/mongo-db-user-repository.js';

export default class MongoDbUserRespositoryFactory {
  static make() {
    return new MongoDbUserRepository(UserModel as typeof Model);
  }
}
