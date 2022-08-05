import { Request, Response, NextFunction } from 'express';

import { Service } from '../service/servers.service';

export class Controller {
  static findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const servers = await Service.findAll();
      res.status(200).json(servers);
    } catch (e) {
      next(e);
    }
  };
}
