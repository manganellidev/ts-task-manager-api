/* eslint-disable @typescript-eslint/no-explicit-any */
import Result from '../../../domain/common/result.js';
import Age from '../../../domain/user/age.js';
import Email from '../../../domain/user/email.js';
import Name from '../../../domain/user/name.js';
import Password from '../../../domain/user/password.js';

export default class CreateUpdateUserInputValidation {
    static validateFieldsKeys(input: any) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { name, email, age, password, ...unknownFields } = input;

        if (Object.keys(unknownFields).length) {
            return Result.fail(
                new Error(
                    Object.keys(unknownFields).length === 1
                        ? `The field ${Object.keys(unknownFields)[0]} is invalid.`
                        : `The fields ${Object.keys(unknownFields)
                              .map((f: string) => f)
                              .join(', ')} are invalid.`
                )
            );
        }

        return Result.ok('');
    }

    static validate(input: any) {
        const { name, email, age, password } = input;

        const nameOrError = Name.create(name);
        const emailOrError = Email.create(email);
        const ageOrError = Age.create(age);
        const passwordOrError = Password.create(password);

        const inputValidationResult = Result.combine([
            nameOrError,
            emailOrError,
            ageOrError,
            passwordOrError
        ]);

        return {
            inputValidationResult,
            resultsChecked: {
                nameOrError,
                emailOrError,
                ageOrError,
                passwordOrError
            }
        };
    }
}
