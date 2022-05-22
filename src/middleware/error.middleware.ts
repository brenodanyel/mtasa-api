import { Request, Response, NextFunction } from 'express';

import { IError } from '../interfaces/IError';

export default function (error: IError, req: Request, res: Response, next: NextFunction) {
  if (error.customMessage) {
    return res.status(error.status).json({ message: error.customMessage });
  }

  console.log(error);

  res.status(500).json({ message: 'internal error' });
}
