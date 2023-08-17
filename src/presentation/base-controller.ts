import { IHTTPErrorResponse } from '../application/base-service.js';
import { HTTPTypeError } from '../application/user/util/type-error-enum.js';
import { IUser } from '../domain/user/user.js';
import Logger, { ILogger } from '../infrastructure/logging/logger.js';
import { IHTTPResponse, mapError } from './common/status-code-mapper.js';

export interface IHTTPRequest {
  user: IUser;
  body: Record<string, unknown>;
  query: {
    [key: string]: unknown;
  };
  params: {
    [key: string]: string;
  };
}

export interface IBaseController<T, U> {
  readonly _route: string;
  readonly _method: string;
  handle(httpRequest: T): Promise<IHTTPResponse<U> | IHTTPResponse<IHTTPErrorResponse>>;
  handleRequest(httpRequest: T): Promise<IHTTPResponse<U> | IHTTPResponse<IHTTPErrorResponse>>;
}

export default abstract class BaseController<T, U> implements IBaseController<T, U> {
  protected readonly logger: ILogger;

  constructor(
    readonly _moduleName: string,
    readonly _route: string,
    readonly _method: string
  ) {
    this.logger = Logger.create(_moduleName);
  }

  async handle(httpRequest: T): Promise<IHTTPResponse<U> | IHTTPResponse<IHTTPErrorResponse>> {
    try {
      return this.handleRequest(httpRequest);
    } catch (error) {
      if (error instanceof Error) {
        this.logger.error(error.message, error.stack);
      }
      return mapError(this.controllerUnexpectedError(), this.logger);
    }
  }

  abstract handleRequest(
    httpRequest: T
  ): Promise<IHTTPResponse<U> | IHTTPResponse<IHTTPErrorResponse>>;

  private controllerUnexpectedError(): IHTTPErrorResponse {
    return {
      errorType: HTTPTypeError.UNEXPECTED_ERROR,
      details: [
        {
          message: 'An unexpected error occured processing the request.'
        }
      ]
    };
  }
}
