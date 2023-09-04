import BaseEntity, { IBaseEntity } from '../base-entity.js';
import { Age, Email, Name, Password, Token } from './user-value-objects.js';

export interface IUser extends IBaseEntity {
  name: Name;
  email: Email;
  age: Age;
  password: Password;
  token: Token;
  createdAt?: Date;
  updatedAt?: Date;
}

export default class User extends BaseEntity implements IUser {
  private _token: Token;

  constructor(
    private _name: Name,
    private _email: Email,
    private _age: Age,
    private _password: Password,
    private readonly _createdAt?: Date,
    private readonly _updatedAt?: Date,
    id = ''
  ) {
    super(id);
    this.validateEntity(_name, _email, _age, _password);
    this._token = Token.createAndSign(this._id).value;
  }

  get name() {
    return this._name;
  }

  set name(name: Name) {
    this._name = name;
  }

  get email() {
    return this._email;
  }

  set email(email: Email) {
    this._email = email;
  }

  get age() {
    return this._age;
  }

  set age(age: Age) {
    this._age = age;
  }

  get password() {
    return this._password;
  }

  set password(password: Password) {
    this._password = password;
  }

  get token() {
    return this._token;
  }

  set token(token: Token) {
    this._token = token;
  }

  get createdAt() {
    return this._createdAt;
  }

  get updatedAt() {
    return this._updatedAt;
  }

  private validateEntity(name: unknown, email: unknown, age: unknown, password: unknown) {
    const corruptionMessage = (parameter: unknown) => `${parameter} is not a proper value object`;

    if (!(name instanceof Name)) {
      throw new Error(corruptionMessage(name));
    }

    if (!(email instanceof Email)) {
      throw new Error(corruptionMessage(email));
    }

    if (!(age instanceof Age)) {
      throw new Error(corruptionMessage(age));
    }

    if (!(password instanceof Password)) {
      throw new Error(corruptionMessage(password));
    }
  }
}
