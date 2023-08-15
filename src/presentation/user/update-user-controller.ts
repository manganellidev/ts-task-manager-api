import { IHTTPErrorResponse } from '../../application/base-service.js';
import UpdateUserService from '../../application/user/update-user-service.js';
import User from '../../domain/user/user.js';
import BaseController, { IHTTPRequest } from '../base-controller.js';
import { IHTTPResponse, mapError, ok } from '../common/status-code-mapper.js';
import { IUserDTO, mapUserFromEntityToDTO } from './util/user-dto-mapper.js';

export default class UpdateUserController extends BaseController<IHTTPRequest, IUserDTO> {
    constructor(private readonly updateUserService: UpdateUserService) {
        super('UpdateUserController', '/users/me', 'patch');
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
        const { user, body } = httpRequest;
        const userOrError = await this.updateUserService.execute(body, user);

        if ((userOrError as IHTTPErrorResponse).errorType) {
            return mapError(userOrError as IHTTPErrorResponse, this.logger, user.id);
        }

        return ok(mapUserFromEntityToDTO(userOrError as User));
    }
}
