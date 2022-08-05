import { timeout } from 'promise-timeout';
import { CustomError } from '../utils/error';
import { Model } from '../model/server.model';

export class Service {
  static async findOne(ip: string, asePort: number) {
    try {
      const promise = Model.findOne(ip, asePort);
      const server = await timeout(promise, 5000);
      return server;
    } catch (e) {
      throw new CustomError(408, 'Request Timeout');
    }
  }
}
