import { Request, Response, NextFunction } from 'express';

import service from '../service/stats.service';

export class Controller {
  static findStats = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const servers = await service.findStats();
      res.status(200).json(servers);
    } catch (e) {
      next(e);
    }
  };
}
