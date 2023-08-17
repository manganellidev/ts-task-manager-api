import { IUser } from '../domain/user/user.js';
import Logger, { ILogger } from '../infrastructure/logging/logger.js';
import { HTTPTypeError } from './user/util/type-error-enum.js';

export interface IHTTPErrorResponse {
  errorType: HTTPTypeError;
  details: {
    message: string;
  }[];
}

interface IBaseService<T> {
  execute(input: unknown): Promise<T | IHTTPErrorResponse>;
  createErrorResponse(type: HTTPTypeError, errors: Error[]): IHTTPErrorResponse;
}

export default abstract class BaseService<T> implements IBaseService<T> {
  protected readonly logger: ILogger;

  constructor(_moduleName: string) {
    this.logger = Logger.create(_moduleName);
  }

  abstract execute(input?: unknown, user?: IUser): Promise<T | IHTTPErrorResponse>;

  createErrorResponse(type: HTTPTypeError, errors: Error[]): IHTTPErrorResponse {
    return {
      errorType: type,
      details: errors.map((error) => ({ message: error.message }))
    };
  }
}
