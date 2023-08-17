import { IHTTPErrorResponse } from '../../application/base-service.js';
import DeleteUserService from '../../application/user/delete-user-service.js';
import BaseController, { IHTTPRequest } from '../base-controller.js';
import { IHTTPResponse, mapError, ok } from '../common/status-code-mapper.js';

export default class DeleteUserController extends BaseController<IHTTPRequest, string> {
  constructor(private readonly deleteUserService: DeleteUserService) {
    super('DeleteUserController', '/users/me', 'delete');
  }

  get route() {
    return this._route;
  }

  get method() {
    return this._method;
  }

  async handleRequest(
    httpRequest: IHTTPRequest
  ): Promise<IHTTPResponse<string> | IHTTPResponse<IHTTPErrorResponse>> {
    const { user } = httpRequest;
    const userOrError = await this.deleteUserService.execute(user.id);

    if ((userOrError as IHTTPErrorResponse).errorType) {
      return mapError(userOrError as IHTTPErrorResponse, this.logger);
    }

    return ok('');
  }
}
