import Validator from '../validator.js';

export default class IsNullOrUndefinedValidator extends Validator<unknown> {
    constructor() {
        super();
    }

    isValid(value: unknown) {
        return value === null || value === undefined;
    }

    errorMessage(property: unknown) {
        return `The ${property} should not be null or undefined.`;
    }
}
