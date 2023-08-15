import { IHTTPErrorResponse } from '../../application/base-service.js';
import CreateUserService from '../../application/user/create-user-service.js';
import User from '../../domain/user/user.js';
import BaseController, { IHTTPRequest } from '../base-controller.js';
import { IHTTPResponse, created, mapError } from '../common/status-code-mapper.js';
import { IUserDTO, mapUserFromEntityToDTO } from './util/user-dto-mapper.js';

export default class CreateUserController extends BaseController<IHTTPRequest, IUserDTO> {
    constructor(private readonly createUserService: CreateUserService) {
        super('CreateUserController', '/users', 'post');
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
        const { body } = httpRequest;
        const userOrError = await this.createUserService.execute(body);

        if ((userOrError as IHTTPErrorResponse).errorType) {
            return mapError(userOrError as IHTTPErrorResponse, this.logger);
        }

        return created(mapUserFromEntityToDTO(userOrError as User));
    }
}
