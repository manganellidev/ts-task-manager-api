import Result from '../../../src/domain/common/result.js';
import Email from '../../../src/domain/user/email.js';

const valueObjectUnderTest = 'Email';

describe(`${valueObjectUnderTest} value object`, () => {
  test(`should create ${valueObjectUnderTest} value object when value is a valid email`, () => {
    const email = 'giorgio_frii@mail.com';
    const emailOrError = Email.create(email) as Result<Email>;

    expect(emailOrError.isSuccess).toBeTruthy();
    expect(emailOrError.value.equals((Email.create(email) as Result<Email>).value)).toBeTruthy();
    expect(emailOrError.error).toBeNull();
  });

  const errorScenarios = [
    'yamail.com',
    'ya@mailcom',
    `y${'a'.repeat(64)}@mail.com`,
    `ya@mail.${'c'.repeat(124)}`,
    `ya@mail.${'c'.repeat(64)}`,
    `ya@${'m'.repeat(64)}.com`,
    `ya@$mail .com`,
    `ya @$mail.com`,
    123,
    {},
    null,
    undefined,
    '',
    '   '
  ];

  test.each(errorScenarios)(
    `should NOT create ${valueObjectUnderTest} value object when value is: %s`,
    (value: unknown) => {
      const emailOrError = Email.create(value);

      expect(emailOrError.isSuccess).toBeFalsy();
      expect(emailOrError.value).toBeNull();
      expect(emailOrError.error).toBeInstanceOf(Error);
    }
  );
});
