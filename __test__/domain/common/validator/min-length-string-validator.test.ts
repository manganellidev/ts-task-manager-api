import IsMinLengthStringValidator from '../../../../src/domain/common/validator/min-length-string-validator';

describe('max-length-string-validator', () => {
  const minLenght = 3;
  const validator = new IsMinLengthStringValidator(minLenght);

  const successScenarios = ['a'.repeat(3), 'a'.repeat(255)];
  test.each(successScenarios)('should return TRUE when value is valid', (value: string) => {
    expect(validator.isValid(value)).toBeTruthy();
  });

  const errorScenarios = ['a'.repeat(2), '', ' '];
  test.each(errorScenarios)('should return FALSE when value is INVALID', (value: string) => {
    expect(validator.isValid(value)).toBeFalsy();
  });

  test.each(errorScenarios)('should return error message with input value', (value: string) => {
    expect(validator.errorMessage(value)).toEqual(
      `The ${value} property should contain at least ${minLenght} chars.`
    );
  });
});
