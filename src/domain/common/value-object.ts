export interface IValueObject<T> {
  value: T;
}

export default abstract class ValueObject<T> {
  constructor(private readonly _value: T) {}

  get value() {
    return this._value;
  }

  equals(other: IValueObject<T>) {
    return this._value === other.value;
  }
}
