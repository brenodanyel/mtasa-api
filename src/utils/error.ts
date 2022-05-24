import { Request, Response, NextFunction } from 'express';

export class CustomError extends Error {
  public code: number;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
  }
}

export const errorMiddleware = (
  error: CustomError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (error instanceof CustomError) {
    res.status(error.code).json({ error: error.message });
    return;
  }
  res.status(500).json({ error: 'Internal error' });
};
