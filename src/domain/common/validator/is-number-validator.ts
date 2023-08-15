import Validator from '../validator.js';

export default class IsNumberValidator extends Validator<unknown> {
    constructor() {
        super();
    }

    isValid(value: unknown) {
        return typeof value === 'number';
    }

    errorMessage(property: unknown) {
        return `The ${property} should be a number.`;
    }
}
