import { Request, Response } from 'express';
import { IBaseController, IHTTPRequest } from '../../../presentation/base-controller.js';
import { IUser } from '../../../domain/user/user.js';
import { ILogger } from '../../logging/logger.js';

export const adaptHandler = (
  baseController: IBaseController<IHTTPRequest, unknown>,
  logger: ILogger
) => {
  return async (req: Request & { user: IUser }, res: Response) => {
    const httpRequest: IHTTPRequest = {
      user: req.user,
      body: req.body,
      query: req.query,
      params: req.params
    };

    logHTTPRequest(req, logger);
    const httpResponse = await baseController.handle(httpRequest);
    res.status(httpResponse.statusCode).send(httpResponse.body);
  };
};

const logHTTPRequest = (req: Request & { user: IUser }, logger: ILogger): void => {
  logger.info(`[${req.method}] UserId: ${req.user ? req.user.id : '-'}`);
};
