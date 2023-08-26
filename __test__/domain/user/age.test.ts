import Result from '../../../src/domain/common/result.js';
import Age from '../../../src/domain/user/age.js';

const valueObjectUnderTest = 'Age';

describe(`${valueObjectUnderTest} value object`, () => {
  const successScenarios = [0, 30, null, undefined];

  test.each(successScenarios)(
    `should create ${valueObjectUnderTest} value object when value is: %s`,
    (value: unknown) => {
      const ageOrError = Age.create(value) as Result<Age>;

      expect(ageOrError.isSuccess).toBeTruthy();
      expect(ageOrError.value.equals((Age.create(value) as Result<Age>).value)).toBeTruthy();
      expect(ageOrError.error).toBeNull();
    }
  );

  const errorScenarios = [-1, 'string', {}, '', '   '];

  test.each(errorScenarios)(
    `should NOT create ${valueObjectUnderTest} value object when value is: %s`,
    (value: unknown) => {
      const ageOrError = Age.create(value);

      expect(ageOrError.isSuccess).toBeFalsy();
      expect(ageOrError.value).toBeNull();
      expect(ageOrError.error).toBeInstanceOf(Error);
    }
  );
});
