import { Model } from 'mongoose';
import IBaseRepository from '../../../../application/base-repository.js';
import { IBaseModel } from '../models/base-model.js';

export default abstract class MongoDbBaseRepository<T, U> implements IBaseRepository<T> {
  constructor(protected readonly entityModel: Model<U & IBaseModel<T>>) {}

  abstract save(obj: T): Promise<T>;

  abstract update(obj: T): Promise<T>;

  async findById(id: string): Promise<T | null> {
    const objModel = await this.entityModel.findById(id);
    return objModel ? objModel.mapToEntity() : objModel;
  }

  async findAll(): Promise<T[]> {
    const objsModel = await this.entityModel.find({});
    const objsEntity = objsModel.map((objModel) => objModel.mapToEntity());
    return objsEntity;
  }

  async deleteById(id: string): Promise<boolean> {
    const wasDeleted = await this.entityModel.deleteOne({ _id: id });
    return !!wasDeleted.deletedCount;
  }
}
