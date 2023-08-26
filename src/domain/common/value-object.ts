export default abstract class ValueObject<T> {
  constructor(private readonly _value: T) {}

  get value() {
    return this._value;
  }

  equals(other: { value: unknown }) {
    console.log(this._value, other.value);
    return this._value === other.value;
  }
}
