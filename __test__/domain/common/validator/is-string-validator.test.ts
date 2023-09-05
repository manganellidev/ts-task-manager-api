import IsStringValidator from '../../../../src/domain/common/validator/is-string-validator';

describe('is-string-validator', () => {
  const validator = new IsStringValidator();

  const successScenarios = ['', ' ', 'string'];
  test.each(successScenarios)('should return TRUE when value is a string', (value: unknown) => {
    expect(validator.isValid(value)).toBeTruthy();
  });

  const errorScenarios = [null, undefined, 1];
  test.each(errorScenarios)('should return FALSE when value is NOT a string', (value: unknown) => {
    expect(validator.isValid(value)).toBeFalsy();
  });

  test.each(errorScenarios)('should return error message with input value', (value: unknown) => {
    expect(validator.errorMessage(value)).toEqual(`The ${value} should be a string.`);
  });
});
