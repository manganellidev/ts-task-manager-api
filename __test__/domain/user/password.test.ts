import Result from '../../../src/domain/common/result.js';
import Password from '../../../src/domain/user/password.js';

const valueObjectUnderTest = 'Password';

describe(`${valueObjectUnderTest} value object`, () => {
  test(`should create ${valueObjectUnderTest} value object when value is a valid password`, () => {
    const password = 'Giorgiooo1!';
    const nameOrError = Password.create(password) as Result<Password>;

    expect(nameOrError.isSuccess).toBeTruthy();
    expect(
      nameOrError.value.equals((Password.create(password) as Result<Password>).value)
    ).toBeTruthy();
    expect(nameOrError.error).toBeNull();
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
    passNumberError,
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
      const nameOrError = Password.create(value);

      expect(nameOrError.isSuccess).toBeFalsy();
      expect(nameOrError.value).toBeNull();
      expect(nameOrError.error).toBeInstanceOf(Error);
    }
  );
});
