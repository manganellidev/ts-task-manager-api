import { IHTTPErrorResponse } from '../../application/base-service.js';
import GetUserService from '../../application/user/get-user-service.js';
import User from '../../domain/user/user.js';
import BaseController, { IHTTPRequest } from '../base-controller.js';
import { IHTTPResponse, mapError, ok } from '../common/status-code-mapper.js';
import { IUserDTO, mapUserFromEntityToDTO } from './util/user-dto-mapper.js';

export default class GetUserController extends BaseController<IHTTPRequest, IUserDTO> {
  constructor(private readonly getUserService: GetUserService) {
    super('GetUserController', '/users/me', 'get');
  }

  get route() {
    return this._route;
  }

  get method() {
    return this._method;
  }

  async handleRequest(
    httpRequest: IHTTPRequest
  ): Promise<IHTTPResponse<IUserDTO> | IHTTPResponse<IHTTPErrorResponse>> {
    const {
      user: { id: userId }
    } = httpRequest;

    const userOrError = await this.getUserService.execute(userId);

    if ((userOrError as IHTTPErrorResponse).errorType) {
      return mapError(userOrError as IHTTPErrorResponse, this.logger, userId);
    }

    return ok(mapUserFromEntityToDTO(userOrError as User));
  }
}
