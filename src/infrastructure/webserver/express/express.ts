import express, { Application, Response, Request, NextFunction } from 'express';
import helmet from 'helmet';
import { HTTPTypeError } from '../../../application/user/util/type-error-enum.js';
import { IHTTPErrorResponse } from '../../../application/base-service.js';
import { IBaseController, IHTTPRequest } from '../../../presentation/base-controller.js';
import { adaptHandler } from './adapt-handler.js';
import { UnauthorizedError, auth } from './middleware/auth.js';
import IUserRepository from '../../../application/user/user-repository.js';
import { IUser } from '../../../domain/user/user.js';
import Logger, { ILogger } from '../../logging/logger.js';
import { createErrorLogMessage } from '../../../presentation/common/status-code-mapper.js';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './documentation/swagger.js';

export default class ExpressWebServer {
  private readonly _logger: ILogger;

  private constructor(
    private readonly app: Application,
    private readonly _userRepository: IUserRepository<IUser>
  ) {
    this._logger = Logger.create('ExpressWebServer');
  }

  static create(
    controllers: IBaseController<IHTTPRequest, unknown>[],
    userRepository: IUserRepository<IUser>
  ) {
    const server = new ExpressWebServer(express(), userRepository);
    server.addMiddlewares();

    controllers.forEach((controller) =>
      server.app[controller._method as keyof Application](
        controller._route,
        adaptHandler(controller, server._logger)
      )
    );

    server.app.use(server.handleNoRoute());
    server.app.use(server.handleExpressException());

    return server.app;
  }

  private addMiddlewares() {
    this.app.use(helmet());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json({ limit: '1mb' }));
    this.app.use(
      '/api-docs',
      swaggerUi.serve,
      swaggerUi.setup(swaggerConfig.specs, swaggerConfig.options)
    );
    this.app.use(auth(this._userRepository));
  }

  private handleNoRoute() {
    return (_: Request, res: Response) => this.noRouteErrorResponse(res);
  }

  private handleExpressException() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
    return (err: any, _req: Request, res: Response, _next: NextFunction) => {
      if (err instanceof SyntaxError) {
        return this.syntaxErrorResponse(res);
      }
      if (err.type === 'entity.too.large') {
        return this.payloadErrorResponse(res);
      }
      if (err instanceof UnauthorizedError) {
        return this.unauthorizedErrorResponse(res, err);
      }
      return this.unexpectedErrorResponse(res);
    };
  }

  private syntaxErrorResponse(res: Response) {
    return res
      .status(400)
      .send(this.createErrorResponse(HTTPTypeError.INVALID_INPUT, 'The json is not valid.'));
  }

  private unauthorizedErrorResponse(res: Response, error: UnauthorizedError) {
    return res
      .status(401)
      .send(this.createErrorResponse(error.type as HTTPTypeError, error.message));
  }

  private payloadErrorResponse(res: Response) {
    return res
      .status(413)
      .send(
        this.createErrorResponse(HTTPTypeError.INVALID_INPUT, 'The json payload is too large.')
      );
  }

  private noRouteErrorResponse(res: Response) {
    return res
      .status(404)
      .send(
        this.createErrorResponse(HTTPTypeError.NOT_FOUND, 'The route requested does not exist.')
      );
  }

  private unexpectedErrorResponse(res: Response) {
    return res
      .status(500)
      .send(
        this.createErrorResponse(
          HTTPTypeError.UNEXPECTED_ERROR,
          'Unexpected error occured on the server.'
        )
      );
  }

  private createErrorResponse(type: HTTPTypeError, detail: string): IHTTPErrorResponse {
    this._logger.error(createErrorLogMessage({ errorType: type, details: [{ message: detail }] }));
    return {
      errorType: type,
      details: [{ message: detail }]
    };
  }
}
