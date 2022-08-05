import { Model } from '../model/servers.model';

export class Service {
  static async findAll() {
    const servers = await Model.findAll();
    return servers;
  }
}
