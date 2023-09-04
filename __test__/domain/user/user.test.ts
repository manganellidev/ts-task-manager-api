import { jest } from '@jest/globals';
import * as valueObjects from '../../../src/domain/user/user-value-objects.js';

const userMock = {
  id: 'UUID mock',
  name: 'name mock',
  email: 'email@mock.com',
  age: 30,
  password: 'Password123@# mock',
  token: 'token mock'
};

jest.unstable_mockModule('crypto', () => ({
  randomUUID: jest.fn().mockImplementation(() => userMock.id)
}));

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: jest.fn().mockImplementation(() => userMock.token)
  }
}));

const User = (await import('../../../src/domain/user/user.js')).default;
const { Age, Email, Name, Password, Token } = await import(
  '../../../src/domain/user/user-value-objects.js'
);
const { randomUUID } = await import('crypto');
const jwt = (await import('jsonwebtoken')).default;

describe('User', () => {
  test('should create a User', () => {
    const name = Name.create(userMock.name).value as valueObjects.Name;
    const email = Email.create(userMock.email).value as valueObjects.Email;
    const age = Age.create(userMock.age).value as valueObjects.Age;
    const password = Password.create(userMock.password).value as valueObjects.Password;

    const newUser = new User(name, email, age, password);

    expect(newUser).toMatchObject({
      _id: userMock.id,
      _name: name,
      _email: email,
      _age: age,
      _password: password,
      _createdAt: undefined,
      _updatedAt: undefined,
      _token: { _value: userMock.token }
    });
    expect(randomUUID).toBeCalled();
    expect(jwt.sign).toBeCalled();
  });

  const errorScenarios: Record<
    'name' | 'email' | 'age' | 'password',
    null | valueObjects.Name | valueObjects.Email | valueObjects.Age | valueObjects.Password
  >[] = [
    {
      name: Name.create(123).value,
      email: Email.create(userMock.email).value,
      age: Age.create(userMock.age).value,
      password: Password.create(userMock.password).value
    },
    {
      name: Name.create(userMock.name).value,
      email: Email.create('userMock.email').value,
      age: Age.create(userMock.age).value,
      password: Password.create(userMock.password).value
    },
    {
      name: Name.create(userMock.name).value,
      email: Email.create(userMock.email).value,
      age: Age.create('userMock.age').value,
      password: Password.create(userMock.password).value
    },
    {
      name: Name.create(userMock.name).value,
      email: Email.create(userMock.email).value,
      age: Age.create(userMock.age).value,
      password: Password.create('userMock.password').value
    }
  ];

  test.each(errorScenarios)(
    'should NOT create User when at least one value object is not valid',
    (valueObjects) => {
      expect(
        () =>
          new User(
            valueObjects.name as valueObjects.Name,
            valueObjects.email as valueObjects.Email,
            valueObjects.age as valueObjects.Age,
            valueObjects.password as valueObjects.Password
          )
      ).toThrowError();
      expect(randomUUID).toBeCalled();
      expect(jwt.sign).not.toBeCalled();
    }
  );

  test('should set and get properties', () => {
    const name = Name.create(userMock.name).value as valueObjects.Name;
    const email = Email.create(userMock.email).value as valueObjects.Email;
    const age = Age.create(userMock.age).value as valueObjects.Age;
    const password = Password.create(userMock.password).value as valueObjects.Password;
    const expectedName = Name.create('name updated').value as valueObjects.Name;
    const expectedEmail = Email.create('email updated').value as valueObjects.Email;
    const expectedAge = Age.create(33).value as valueObjects.Age;
    const expectedPassword = Password.create('Pass123!@#updated').value as valueObjects.Password;
    const expectedToken = Token.create('token updated').value;

    const newUser = new User(name, email, age, password);

    newUser.name = expectedName;
    newUser.email = expectedEmail;
    newUser.age = expectedAge;
    newUser.password = expectedPassword;
    newUser.token = expectedToken;

    expect(newUser.name).toEqual(expectedName);
    expect(newUser.email).toEqual(expectedEmail);
    expect(newUser.age).toEqual(expectedAge);
    expect(newUser.password).toEqual(expectedPassword);
    expect(newUser.token).toEqual(expectedToken);
    expect(newUser.createdAt).toBeUndefined();
    expect(newUser.updatedAt).toBeUndefined();
  });
});
