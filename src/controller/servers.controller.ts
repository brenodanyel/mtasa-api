import { Request, Response, NextFunction } from 'express';

import service from '../service/servers.service';

class Controller {
  static findAll = async (_req: Request, res: Response, next: NextFunction) => {
    try {
      const servers = await service.findAll();
      res.status(200).json(servers);
    } catch (e) {
      next(e);
    }
  };
}

export default Controller;
