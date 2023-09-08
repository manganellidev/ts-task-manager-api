import { randomUUID } from 'crypto';

export interface IBaseEntity {
  id: string;
}

export default abstract class BaseEntity implements IBaseEntity {
  constructor(protected readonly _id: string) {
    this._id = _id ? _id : randomUUID();
  }

  get id() {
    return this._id;
  }
}
