import { Request, Response, NextFunction } from 'express';
import { Service } from '../service/server.service';

export class Controller {
  static async findOne(req: Request, res: Response, next: NextFunction) {
    try {
      const { ip, asePort } = req.query;
      const server = await Service.findOne(String(ip), Number(asePort));
      res.status(200).json(server);
    } catch (e) {
      next(e);
    }
  }
}
