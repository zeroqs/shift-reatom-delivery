interface SuccessResult<T> {
  error: null;
  result: T;
}
interface FailureResult {
  error: Error;
  result: undefined;
}
type Result<T> = FailureResult | SuccessResult<T>;

export const catchError = <T>(func: () => Promise<T> | T): Promise<Result<T>> | Result<T> => {
  try {
    const res = func();
    if (res instanceof Promise) {
      return new Promise<Result<T>>((resolve) => {
        res
          .then((res) => resolve({ result: res, error: null } as SuccessResult<T>))
          .catch((error) => resolve({ result: undefined, error } as FailureResult));
      });
    }
    return { result: res, error: null } as SuccessResult<T>;
  } catch (error: any) {
    return { result: undefined, error } as FailureResult;
  }
};
