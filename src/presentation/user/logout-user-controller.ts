import { IHTTPErrorResponse } from '../../application/base-service.js';
import LogoutUserService from '../../application/user/logout-user-service.js';
import BaseController, { IHTTPRequest } from '../base-controller.js';
import { IHTTPResponse, ok } from '../common/status-code-mapper.js';

export default class LogoutUserController extends BaseController<IHTTPRequest, null> {
  constructor(private readonly logoutUserService: LogoutUserService) {
    super('LogoutUserController', '/users/logout', 'post');
  }

  get route() {
    return this._route;
  }

  get method() {
    return this._method;
  }

  async handleRequest(
    httpRequest: IHTTPRequest
  ): Promise<IHTTPResponse<null> | IHTTPResponse<IHTTPErrorResponse>> {
    const { user } = httpRequest;
    await this.logoutUserService.execute(user);
    return ok(null);
  }
}
