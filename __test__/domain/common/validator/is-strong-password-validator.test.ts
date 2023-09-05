import IsMaxLengthStringValidator from '../../../../src/domain/common/validator/is-strong-password-validator';

describe('max-length-string-validator', () => {
  const validator = new IsMaxLengthStringValidator();

  const successScenarios = ['Giorgioo1!'];
  test.each(successScenarios)('should return TRUE when value is valid', (value: string) => {
    expect(validator.isValid(value)).toBeTruthy();
  });

  const passLenghtError = 'Giorgio1!';
  const passSymbolError = 'Giorgiooo1';
  const passUppercaseError = 'giorgiooo1!';
  const passLowecaseError = 'GIORGIOOO1!';
  const passNumberError = 'Giorgiooo!';
  const errorScenarios = [
    passLenghtError,
    passSymbolError,
    passUppercaseError,
    passLowecaseError,
    passNumberError
  ];
  test.each(errorScenarios)('should return FALSE when value is INVALID', (value: string) => {
    expect(validator.isValid(value)).toBeFalsy();
  });

  test.each(errorScenarios)('should return error message with input value', (value: string) => {
    expect(validator.errorMessage(value)).toEqual(
      `The ${value} must be at least 10 characters long, and contain at least one number, one lowercase letter, one uppercase letter, and one symbol.`
    );
  });
});
