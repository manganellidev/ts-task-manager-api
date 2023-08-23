import Result from '../../../src/domain/common/result.js';
import Name from '../../../src/domain/user/name.js';

describe('name', () => {
  test(`should create Name value object when value is a valid string`, () => {
    const name = 'Alex Goffri';
    const nameOrError = Name.create(name) as Result<Name>;

    expect(nameOrError.isSuccess).toBeTruthy();
    expect(nameOrError.value.equals((Name.create(name) as Result<Name>).value)).toBeTruthy();
    expect(nameOrError.error).toBeNull();
  });
});
