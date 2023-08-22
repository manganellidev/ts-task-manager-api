/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import Result from '../../../domain/common/result.js';
import { InputType } from './input-type-enum.js';

export default class UserInputKeysValidation {
  static validate(type: InputType, input: any) {
    const validationMap = {
      [InputType.LOGIN]: ({ email, password, ...unknownFields }: any) => unknownFields,
      [InputType.CREATE_UPDATE]: ({ name, email, age, password, ...unknownFields }: any) =>
        unknownFields
    };

    const unknownFields = validationMap[type](input);
    if (Object.keys(unknownFields).length) {
      return this.createResultFailForUnknownFields(unknownFields);
    }

    return Result.ok(null);
  }

  private static createResultFailForUnknownFields(unknownFields: Record<string, unknown>[]) {
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
}
