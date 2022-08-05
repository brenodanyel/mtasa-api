import { Model } from '../model/stats.model';

class Service {
  static async findStats() {
    const servers = await Model.findStats();
    return servers;
  }
}

export default Service;
