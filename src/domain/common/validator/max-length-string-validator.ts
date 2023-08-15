import Validator from '../validator.js';

export default class MaxLengthStringValidator extends Validator<string> {
    constructor(private readonly _maxLength: number) {
        super();
    }

    isValid(value: string): boolean {
        return value.trim().length <= this._maxLength;
    }

    errorMessage(property: string): string {
        return `The "${property}" property should contain at most ${this._maxLength} chars.`;
    }
}
