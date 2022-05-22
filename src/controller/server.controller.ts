import { Request, Response, NextFunction } from 'express';

import service from '../service/server.service';

class Controller {
  public static fetchServer = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { ip, asePort } = req.query;
      const server = await service.fetchServer(String(ip), Number(asePort));
      res.status(200).json(server);
    } catch (e) {
      next(e);
    }
  };
}

export default Controller;
