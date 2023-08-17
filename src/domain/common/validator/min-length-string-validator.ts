import Validator from '../validator.js';

export default class MinLengthStringValidator extends Validator<string> {
  constructor(private readonly _minLength: number) {
    super();
  }

  isValid(value: string): boolean {
    return (value as string).trim().length >= this._minLength;
  }

  errorMessage(property: string): string {
    return `The "${property}" property should contain at least ${this._minLength} chars.`;
  }
}
