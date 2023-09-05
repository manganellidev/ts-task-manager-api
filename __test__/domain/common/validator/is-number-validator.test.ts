import IsNumberValidator from '../../../../src/domain/common/validator/is-number-validator';

describe('is-number-validator', () => {
  const validator = new IsNumberValidator();

  const successScenarios = [1, -1, 0, 100000123456789];
  test.each(successScenarios)('should return TRUE when value is a number', (value: unknown) => {
    expect(validator.isValid(value)).toBeTruthy();
  });

  const errorScenarios = ['', ' ', 'string', null, undefined];
  test.each(errorScenarios)('should return FALSE when value is NOT a number', (value: unknown) => {
    expect(validator.isValid(value)).toBeFalsy();
  });

  test.each(errorScenarios)('should return error message with input value', (value: unknown) => {
    expect(validator.errorMessage(value)).toEqual(`The ${value} should be a number.`);
  });
});
