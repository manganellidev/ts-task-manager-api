import Result, { IFail, IFailCombine } from '../../../domain/common/result.js';

export interface IInputValidation<T> {
  inputValidationResult: Result<null> | IFail | IFailCombine;
  resultsChecked: {
    [key: string]: Result<T> | IFail;
  };
}
