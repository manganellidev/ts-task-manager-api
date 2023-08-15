import { Request, Response } from 'express';
import { IBaseController, IHTTPRequest } from '../../../presentation/base-controller.js';
import { IUser } from '../../../domain/user/user.js';

export const adaptHandler = (baseController: IBaseController<IHTTPRequest, unknown>) => {
    return async (req: Request & { user: IUser }, res: Response) => {
        const httpRequest: IHTTPRequest = {
            user: req.user,
            body: req.body,
            query: req.query,
            params: req.params
        };

        const httpResponse = await baseController.handle(httpRequest);
        res.status(httpResponse.statusCode).send(httpResponse.body);
    };
};
