import IsNullOrUndefinedValidator from '../../../../src/domain/common/validator/is-null-or-undefined-validator';

describe('is-null-or-undefined-validator', () => {
  const validator = new IsNullOrUndefinedValidator();

  const successScenarios = [null, undefined];
  test.each(successScenarios)(
    'should return TRUE when value is null or undefined',
    (value: unknown) => {
      expect(validator.isValid(value)).toBeTruthy();
    }
  );

  const errorScenarios = ['', ' ', 1, 'string'];
  test.each(errorScenarios)(
    'should return FALSE when value is NOT null or undefined',
    (value: unknown) => {
      expect(validator.isValid(value)).toBeFalsy();
    }
  );

  test.each(errorScenarios)('should return error message with input value', (value: unknown) => {
    expect(validator.errorMessage(value)).toEqual(`The ${value} should not be null or undefined.`);
  });
});
