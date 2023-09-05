import IsEmailValidator from '../../../../src/domain/common/validator/is-email-validator';

describe('is-email-validator', () => {
  const validator = new IsEmailValidator();

  const successScenarios = ['one@mail.com', 'one.two@mail123.net', 'one_two.three@mail.com'];
  test.each(successScenarios)('should return TRUE when value is a valid email', (value: string) => {
    expect(validator.isValid(value)).toBeTruthy();
  });

  const errorScenarios = [
    '',
    ' ',
    'string',
    '@string.com',
    'one.mail.com',
    `y${'a'.repeat(64)}@mail.com`,
    `ya@mail.${'c'.repeat(124)}`,
    `ya@mail.${'c'.repeat(64)}`,
    `ya@${'m'.repeat(64)}.com`
  ];
  test.each(errorScenarios)(
    'should return FALSE when value is an INVALID email',
    (value: string) => {
      expect(validator.isValid(value)).toBeFalsy();
    }
  );

  test.each(errorScenarios)('should return error message with input value', (value: unknown) => {
    expect(validator.errorMessage(value)).toEqual(`The ${value} should be an email.`);
  });
});
