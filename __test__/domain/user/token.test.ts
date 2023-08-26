import { jest } from '@jest/globals';
import Result from '../../../src/domain/common/result.js';
import TokenType from '../../../src/domain/user/token.js';

jest.unstable_mockModule('jsonwebtoken', () => ({
  default: {
    sign: jest.fn().mockImplementation(() => 'mockedToken')
  }
}));

const { default: Token } = await import('../../../src/domain/user/token.js');

const valueObjectUnderTest = 'Token';

describe(`${valueObjectUnderTest} value object`, () => {
  test(`should createAndSign ${valueObjectUnderTest} value object`, () => {
    const userId = 'b25118ee-1502-4e29-9d05-3c584b054dc1';
    const token = Token.createAndSign(userId) as Result<TokenType>;

    expect(token.isSuccess).toBeTruthy();
    expect(
      token.value.equals((Token.createAndSign(userId) as Result<TokenType>).value)
    ).toBeTruthy();
    expect(token.error).toBeNull();
  });

  test(`should create ${valueObjectUnderTest} value object`, () => {
    const mockCurrentToken = 'mockedContextToken';
    const token = Token.create(mockCurrentToken) as Result<TokenType>;

    expect(token.isSuccess).toBeTruthy();
    expect(
      token.value.equals((Token.create(mockCurrentToken) as Result<TokenType>).value)
    ).toBeTruthy();
    expect(token.error).toBeNull();
  });
});
