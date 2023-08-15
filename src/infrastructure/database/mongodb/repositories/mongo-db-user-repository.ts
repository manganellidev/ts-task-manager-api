/* eslint-disable @typescript-eslint/no-non-null-assertion */
import IUserRepository from '../../../../application/user/user-repository.js';
import MongoDbBaseRepository from './mongo-db-base-repository.js';
import { IUserModel, UserModel } from '../models/user-model.js';
import { Model } from 'mongoose';
import { IUser } from '../../../../domain/user/user.js';
import { IBaseModel } from '../models/base-model.js';

export default class MongoDbUserRepository
    extends MongoDbBaseRepository<IUser, typeof UserModel>
    implements IUserRepository<IUser>
{
    constructor(entityModel: Model<typeof UserModel & IBaseModel<IUser>>) {
        super(entityModel);
    }

    async save(user: IUser): Promise<IUser> {
        const userModelToSave = new this.entityModel(this.mapToModel(user));
        const userSaved = await userModelToSave.save();
        return userSaved.mapToEntity();
    }

    async update(user: IUser): Promise<IUser> {
        await this.entityModel.updateOne({ _id: user.id }, this.mapToModel(user), {
            returnDocument: 'after'
        });
        return user;
    }

    private mapToModel(user: IUser): Omit<IUserModel, 'createdAt' | 'updatedAt' | 'mapToEntity'> {
        return {
            _id: user.id,
            name: user.name.value,
            email: user.email.value,
            age: user.age.value,
            password: user.password.value,
            token: user.token.value
        };
    }
}
