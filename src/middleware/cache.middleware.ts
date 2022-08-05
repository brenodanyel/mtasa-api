import { Request, NextFunction } from 'express';
import mcache from 'memory-cache';

export const Cache = (seconds: number) => (req: Request, res: any, next: NextFunction) => {
  const key = req.originalUrl || req.url;

  console.log(key);

  const cachedBody = mcache.get(key);

  if (cachedBody) {
    res.status(200).send(cachedBody);
    return;
  }

  res.sendResponse = res.send;

  res.send = (body: any) => {
    mcache.put(key, body, seconds * 1000);
    res.sendResponse(body);
  };

  next();
};
