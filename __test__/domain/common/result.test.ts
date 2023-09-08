import Result from '../../../src/domain/common/result';

describe('result', () => {
  test('should return OK result', () => {
    const res = Result.ok('mock test');

    expect(res).toBeInstanceOf(Result);
    expect(res.value).toEqual('mock test');
    expect(res.isSuccess).toBeTruthy();
    expect(res.error).toBeNull();
  });

  test('should return OK result for multiple inputs', () => {
    const mockResOk = Result.ok('mock test');
    const mockResOk2 = Result.ok('mock test 2');
    const mockResOk3 = Result.ok('mock test 3');

    const resCombine = Result.combine([mockResOk, mockResOk2, mockResOk3]);

    expect(resCombine).toBeInstanceOf(Result);
    expect(resCombine.value).toBeNull();
    expect(resCombine.isSuccess).toBeTruthy();
    expect(resCombine.error).toBeNull();
  });

  test('should return FAIL result', () => {
    const res = Result.fail(new Error('mock error'));

    expect(res).toBeInstanceOf(Result);
    expect(res.value).toBeNull();
    expect(res.isSuccess).toBeFalsy();
    expect(res.error).toBeInstanceOf(Error);
  });

  test('should return multiple FAILURES result', () => {
    const mockResOk = Result.ok('mock test');
    const mockResFail = Result.fail(new Error('mock error'));
    const mockResFail2 = Result.fail(new Error('mock error 2'));

    const resCombine = Result.combine([mockResOk, mockResFail, mockResFail2]);

    expect(resCombine).toBeInstanceOf(Result);
    expect(resCombine.value).toBeNull();
    expect(resCombine.isSuccess).toBeFalsy();
    expect(resCombine.error).toEqual([mockResFail.error, mockResFail2.error]);
  });

  test('should throw error when at least one input value is not an instance of Result', () => {
    const mockResOk = Result.ok('mock test');
    const mockResFail = Result.fail(new Error('mock error'));
    const mockResInvalid = 'mock invalid';

    expect(() => Result.combine([mockResOk, mockResFail, mockResInvalid])).toThrowError(
      'Result item must be an instance of Result class to be combined'
    );
  });
});
