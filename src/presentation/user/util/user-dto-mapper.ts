/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { IUser } from '../../../domain/user/user.js';

export interface IUserDTO {
    id: string;
    name: string;
    email: string;
    age: number;
    password: string;
    token: string;
    createdAt: Date;
    updatedAt: Date;
}

export const mapUserFromEntityToDTO = (user: IUser): IUserDTO => {
    return {
        id: user.id,
        name: user.name.value,
        email: user.email.value,
        age: user.age.value,
        password: user.password.value,
        token: user.token.value,
        createdAt: user.createdAt!,
        updatedAt: user.updatedAt!
    };
};
