import Validator from '../validator.js';
import isStrongPassword from 'validator/lib/isStrongPassword.js';

export default class IsStrongPasswordValidator extends Validator<string> {
    constructor() {
        super();
    }

    isValid(value: string) {
        return isStrongPassword.default(value, {
            minLength: 10
        });
    }

    errorMessage(property: unknown) {
        return `The ${property} must be at least 10 characters long, and contain at least one number, one lowercase letter, one uppercase letter, and one symbol.`;
    }
}
