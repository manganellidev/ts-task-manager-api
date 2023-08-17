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

    return new Token(token);
  }

  static create(token: string) {
    return new Token(token);
  }
}
