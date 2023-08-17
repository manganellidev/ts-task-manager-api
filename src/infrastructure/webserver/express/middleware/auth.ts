/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import IUserRepository from '../../../../application/user/user-repository.js';
import { IUser } from '../../../../domain/user/user.js';

export const auth = (userRepository: IUserRepository<IUser>) => {
  return async (req: Request & { user: IUser }, res: Response, next: NextFunction) => {
    try {
      const token = req.header('Authorization')?.replace('Bearer ', '');

      if (!token) {
        throw new Error();
      }

      const decoded = jwt.verify(token, process.env.JWT_SECRET!) as Record<string, unknown>;
      const user = await userRepository.findById(decoded.id as string);

      if (!user) {
        throw new Error();
      }

      req.user = user;
      next();
    } catch (error) {
      const errorResponse = {
        errorType: 'UNAUTHORIZED',
        details: [{ message: 'Please authenticate.' }]
      };
      res.status(401).send(errorResponse);
    }
  };
};
