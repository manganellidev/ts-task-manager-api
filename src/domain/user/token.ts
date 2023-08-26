import Result from '../common/result.js';
import ValueObject from '../common/value-object.js';
import jwt from 'jsonwebtoken';

export default class Token extends ValueObject<string> {
  constructor(_token: string) {
    super(_token);
  }

  static createAndSign(userId: string) {
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET ?? '', {
      expiresIn: '7 days'
    });

    return Result.ok(new Token(token));
  }

  static create(token: string) {
    return Result.ok(new Token(token));
  }
}
