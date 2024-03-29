/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import IUserRepository from '../../../../application/user/user-repository.js';
import { IUser } from '../../../../domain/user/user.js';
import { HTTPErrorType } from '../../../../application/user/util/http-error-type-enum.js';

export class UnauthorizedError extends Error {
  public readonly type = HTTPErrorType.UNAUTHORIZED;

  constructor() {
    super('Please authenticate.');
    this.name = 'UnauthorizedError';
  }
}

interface IRequestWithUser extends Request {
  user: IUser;
}

const isRouteWithoutAuthentication = (method: string, path: string): boolean =>
  method === 'POST' && ['/users', '/users/login'].includes(path);

export const auth = (userRepository: IUserRepository<IUser>) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      if (isRouteWithoutAuthentication(req.method, req.path)) {
        return next();
      }

      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        return next(new UnauthorizedError());
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Record<string, unknown>;
      const user = await userRepository.findById(decoded.id as string);

      if (!user || !user.token.value) {
        return next(new UnauthorizedError());
      }

      (req as IRequestWithUser).user = user;
      next();
    } catch (error) {
      next(error);
    }
  };
};
