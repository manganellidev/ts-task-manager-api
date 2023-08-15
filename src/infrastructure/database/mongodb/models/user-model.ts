/* eslint-disable @typescript-eslint/no-non-null-assertion */
import mongoose from 'mongoose';
import Name from '../../../../domain/user/name.js';
import Email from '../../../../domain/user/email.js';
import Age from '../../../../domain/user/age.js';
import Password from '../../../../domain/user/password.js';
import Token from '../../../../domain/user/token.js';
import { IUser } from '../../../../domain/user/user.js';
import { IBaseModel } from './base-model.js';

const Schema = mongoose.Schema;

export interface IUserModel extends IBaseModel<IUser> {
    _id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUserModel>(
    {
        _id: String,
        name: String,
        email: String,
        age: Number,
        password: String,
        token: String
    },
    {
        timestamps: true
    }
);

userSchema.methods.mapToEntity = function (): IUser {
    const userModel = this as unknown as IUserModel;
    return {
        id: userModel._id,
        name: Name.create(userModel.name).value!,
        email: Email.create(userModel.email).value!,
        age: Age.create(userModel.age).value!,
        password: Password.create(userModel.password).value!,
        token: Token.create(userModel.token),
        createdAt: userModel.createdAt,
        updatedAt: userModel.updatedAt
    };
};

export const UserModel = mongoose.model<IUserModel & IBaseModel<IUser>>('User', userSchema);
