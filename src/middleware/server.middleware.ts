import { Request, Response, NextFunction } from 'express';

class Middleware {
  private static checkIP = async (req: Request, res: Response, next: NextFunction) => {
    const { ip } = req.query;

    if (typeof ip !== 'string') {
      return res.status(400).json({ message: '"ip" must be a string' });
    }

    next();
  };

  private static checkPort = async (req: Request, res: Response, next: NextFunction) => {
    const { asePort } = req.query;

    const port = Number(asePort);

    if (!port) {
      return res.status(400).json({ message: '"port" must be a number' });
    }

    if ((port < 0) || (port > 65536)) {
      return res.status(400).json({ message: '"port" should be > 0 and < 65536' });
    }

    next();
  };

  public static fetchServer = [this.checkIP, this.checkPort];
}

export default Middleware;
