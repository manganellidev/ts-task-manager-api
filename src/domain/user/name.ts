import Result from '../common/result.js';
import IsStringValidator from '../common/validator/is-string-validator.js';
import MaxLengthStringValidator from '../common/validator/max-length-string-validator.js';
import MinLengthStringValidator from '../common/validator/min-length-string-validator.js';
import ValueObject from '../common/value-object.js';

export default class Name extends ValueObject<string> {
    private constructor(_name: string) {
        super(_name);
    }

    static create(name: unknown) {
        const isStringValidator = new IsStringValidator();
        if (!isStringValidator.isValid(name)) {
            return Result.fail(new Error(isStringValidator.errorMessage(name)));
        }

        const nameStr = name as string;

        const minNameLength = 3;
        const minLengthStringValidator = new MinLengthStringValidator(minNameLength);
        if (!minLengthStringValidator.isValid(nameStr)) {
            return Result.fail(new Error(minLengthStringValidator.errorMessage(nameStr)));
        }

        const maxNameLength = 200;
        const maxLengthStringValidator = new MaxLengthStringValidator(maxNameLength);
        if (!maxLengthStringValidator.isValid(nameStr)) {
            return Result.fail(new Error(maxLengthStringValidator.errorMessage(nameStr)));
        }

        return Result.ok<Name>(new Name(nameStr));
    }
}
