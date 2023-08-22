import { IUser } from '../domain/user/user.js';
import Logger, { ILogger } from '../infrastructure/logging/logger.js';
import { HTTPErrorType } from './user/util/http-error-type-enum.js';

export interface IHTTPErrorResponse {
  errorType: HTTPErrorType;
  details: {
    message: string;
  }[];
}

interface IBaseService<T> {
  execute(input: unknown): Promise<T | IHTTPErrorResponse>;
  createErrorResponse(type: HTTPErrorType, errors: Error[]): IHTTPErrorResponse;
}

export default abstract class BaseService<T> implements IBaseService<T> {
  protected readonly logger: ILogger;

  constructor(_moduleName: string) {
    this.logger = Logger.create(_moduleName);
  }

  abstract execute(input?: unknown, user?: IUser): Promise<T | IHTTPErrorResponse>;

  createErrorResponse(type: HTTPErrorType, errors: Error[]): IHTTPErrorResponse {
    return {
      errorType: type,
      details: errors.map((error) => ({ message: error.message }))
    };
  }
}
