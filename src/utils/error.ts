import { IError } from '../interfaces/IError';

export function generateError(status: number, customMessage: string): IError {
  const stack = new Error(customMessage);

  return {
    status,
    customMessage,
    stack,
  };
}
