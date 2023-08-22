export interface IFailCombine {
  isSuccess: false;
  value: null;
  error: Error[];
}

export interface IFail {
  isSuccess: false;
  value: null;
  error: Error;
}

export default class Result<T> {
  private constructor(
    private readonly _isSuccess: boolean,
    private readonly _value: T,
    private readonly _error: Error | Error[] | null
  ) {}

  get isSuccess() {
    return this._isSuccess;
  }

  get value() {
    return this._value;
  }

  get error() {
    return this._error;
  }

  static ok<T>(value: T) {
    return new Result<T>(true, value, null);
  }

  static fail(error: Error): IFail {
    return new Result(false, null, error) as IFail;
  }

  static failCombine(errors: Error[]): IFailCombine {
    return new Result(false, null, errors) as IFailCombine;
  }

  static combine(results: unknown[]) {
    Result.validateEntity(results);

    const errors: Error[] = [];
    (results as Result<unknown>[]).forEach((result) => {
      if (!result._isSuccess) {
        errors.push(result._error as Error);
      }
    });

    if (errors.length) {
      return Result.failCombine(errors);
    }

    return Result.ok(null);
  }

  static validateEntity(results: unknown[]) {
    results.forEach((result) => {
      if (!(result instanceof Result)) {
        throw new Error('Result item must be an instance of Result class to be combined');
      }
    });
  }
}
