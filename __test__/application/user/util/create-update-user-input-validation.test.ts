import { jest } from '@jest/globals';
import Result from '../../../../src/domain/common/result';

jest.unstable_mockModule('../../../../src/domain/user/user-value-objects', () => ({
  Name: {
    create: jest.fn().mockImplementation(() => 'name mock')
  },
  Email: {
    create: jest.fn().mockImplementation(() => 'email mock')
  },
  Age: {
    create: jest.fn().mockImplementation(() => 'age mock')
  },
  Password: {
    create: jest.fn().mockImplementation(() => 'password mock')
  }
}));

jest.unstable_mockModule('../../../../src/domain/common/result', () => ({
  default: {
    combine: jest.fn().mockImplementation(() => Result.ok(null))
  }
}));

const { Age, Email, Name, Password } = await import(
  '../../../../src/domain/user/user-value-objects'
);
const ResultMock = (await import('../../../../src/domain/common/result')).default;
const CreateUpdateUserInputValidation = (
  await import('../../../../src/application/user/util/create-update-user-input-validation')
).default;

describe('create-update-user-input-validation', () => {
  interface IScenario {
    input: {
      name: string;
      email: string;
      age?: number;
      password: string;
    };
    passwordGenerateHash?: boolean;
  }

  const validScenarios: IScenario[] = [
    {
      input: {
        name: 'Alex Mock',
        email: 'alex.mock@mail.com',
        password: 'AlexM!@#123ock'
      }
    },
    {
      input: {
        name: 'Alex Mock',
        email: 'alex.mock@mail.com',
        age: 29,
        password: 'AlexM!@#123ock'
      }
    },
    {
      input: {
        name: 'Alex Mock',
        email: 'alex.mock@mail.com',
        age: 29,
        password: 'AlexM!@#123ock'
      },
      passwordGenerateHash: false
    }
  ];

  test.each(validScenarios)('should validate input values', (obj: IScenario) => {
    const shouldGeneratePasswordHash =
      'passwordGenerateHash' in obj && typeof obj.passwordGenerateHash === 'boolean';

    const res = CreateUpdateUserInputValidation.validate(obj.input, shouldGeneratePasswordHash);

    expect(res.inputValidationResult).toEqual(Result.ok(null));
    expect(res.resultsChecked['nameOrError']).toEqual('name mock');
    expect(res.resultsChecked['emailOrError']).toEqual('email mock');
    expect(res.resultsChecked['ageOrError']).toEqual('age mock');
    expect(res.resultsChecked['passwordOrError']).toEqual('password mock');
    expect(Name.create).toBeCalledWith(obj.input.name);
    expect(Email.create).toBeCalledWith(obj.input.email);
    expect(Age.create).toBeCalledWith(obj.input.age);
    expect(Password.create).toBeCalledWith(obj.input.password, shouldGeneratePasswordHash);
    expect(ResultMock.combine).toBeCalledWith([
      'name mock',
      'email mock',
      'age mock',
      'password mock'
    ]);
  });
});
