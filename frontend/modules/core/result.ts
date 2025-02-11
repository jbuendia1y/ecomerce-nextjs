export class Result<T = unknown, E = unknown> {
  constructor(private _isError: boolean, private data: T | E) {}

  static Ok<T>(value: T) {
    return new Result(false, value);
  }
  static Error<E>(value: E) {
    return new Result(true, value);
  }

  map<N>(cb: (value: T) => N) {
    return new Result(
      this._isError,
      this._isError ? cb(this.data as T) : this.data
    );
  }
}
