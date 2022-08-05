import { Request, Response, NextFunction } from 'express';

import { Service } from '../service/stats.service';

export class Controller {
  static findStats = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const servers = await Service.findStats();
      res.status(200).json(servers);
    } catch (e) {
      next(e);
    }
  };
}
