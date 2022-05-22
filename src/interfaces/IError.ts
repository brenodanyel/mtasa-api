export interface IError {
  customMessage: string,
  status: number,
  stack: Error;
}
