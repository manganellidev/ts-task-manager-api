interface IValidator<T> {
  isValid(value: T): boolean;
  errorMessage(property: T): string;
}

export default abstract class Validator<T> implements IValidator<T> {
  abstract isValid(value: T): boolean;
  abstract errorMessage(property: T): string;
}
