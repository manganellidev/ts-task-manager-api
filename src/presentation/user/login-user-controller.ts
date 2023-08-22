import { IHTTPErrorResponse } from '../../application/base-service.js';
import LoginUserService from '../../application/user/login-user-service.js';
import { IUser } from '../../domain/user/user.js';
import BaseController, { IHTTPRequest } from '../base-controller.js';
import { IHTTPResponse, mapError, ok } from '../common/status-code-mapper.js';

interface IUserLoginToken {
  token: string;
}

export default class LoginUserController extends BaseController<IHTTPRequest, IUserLoginToken> {
  constructor(private readonly loginUserService: LoginUserService) {
    super('LoginUserController', '/users/login', 'post');
  }

  get route() {
    return this._route;
  }

  get method() {
    return this._method;
  }

  async handleRequest(
    httpRequest: IHTTPRequest
  ): Promise<IHTTPResponse<IUserLoginToken> | IHTTPResponse<IHTTPErrorResponse>> {
    const { body } = httpRequest;
    const userOrError = await this.loginUserService.execute(body);

    if ((userOrError as IHTTPErrorResponse).errorType) {
      return mapError(userOrError as IHTTPErrorResponse, this.logger);
    }

    return ok({ token: (userOrError as IUser).token.value });
  }
}
