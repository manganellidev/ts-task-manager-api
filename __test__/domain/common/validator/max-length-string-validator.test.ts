import IsMaxLengthStringValidator from '../../../../src/domain/common/validator/max-length-string-validator';

describe('max-length-string-validator', () => {
  const maxLenght = 10;
  const validator = new IsMaxLengthStringValidator(maxLenght);

  const successScenarios = ['', ' ', 'string', 'a'.repeat(10)];
  test.each(successScenarios)('should return TRUE when value is valid', (value: string) => {
    expect(validator.isValid(value)).toBeTruthy();
  });

  const errorScenarios = ['a'.repeat(11)];
  test.each(errorScenarios)('should return FALSE when value is INVALID', (value: string) => {
    expect(validator.isValid(value)).toBeFalsy();
  });

  test.each(errorScenarios)('should return error message with input value', (value: string) => {
    expect(validator.errorMessage(value)).toEqual(
      `The ${value} property should contain at most ${maxLenght} chars.`
    );
  });
});
