import Result from '../../../src/domain/common/result.js';
import Name from '../../../src/domain/user/name.js';

const valueObjectUnderTest = 'Name';

describe(`${valueObjectUnderTest} value object`, () => {
  test(`should create ${valueObjectUnderTest} value object when value is a valid string`, () => {
    const name = 'Giorgio Frii';
    const nameOrError = Name.create(name) as Result<Name>;

    expect(nameOrError.isSuccess).toBeTruthy();
    expect(nameOrError.value.equals((Name.create(name) as Result<Name>).value)).toBeTruthy();
    expect(nameOrError.error).toBeNull();
  });

  const errorScenarios = ['Ya', 123, {}, null, undefined, '', '   ', 'a'.repeat(201)];

  test.each(errorScenarios)(
    `should NOT create ${valueObjectUnderTest} value object when value is: %s`,
    (value: unknown) => {
      const nameOrError = Name.create(value);

      expect(nameOrError.isSuccess).toBeFalsy();
      expect(nameOrError.value).toBeNull();
      expect(nameOrError.error).toBeInstanceOf(Error);
    }
  );
});
