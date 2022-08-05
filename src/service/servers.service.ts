import { Model } from '../model/servers.model';

class Service {
  static async findAll() {
    const servers = await Model.findAll();
    return servers;
  }
}

export default Service;
