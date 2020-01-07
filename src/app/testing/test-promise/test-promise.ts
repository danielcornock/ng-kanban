export class TestPromise<T> {
  public promise: Promise<T>;

  public resolve: [T] extends [void] ? (data?: T) => void : (data: T) => void;
  public reject: (err: unknown) => void;

  constructor() {
    this.promise = new Promise<T>(
      (
        resolve: [T] extends [void] ? (data?: T) => void : (data: T) => void,
        reject: (err: unknown) => void
      ): void => {
        this.resolve = resolve;
        this.reject = reject;
      }
    );
  }
}
