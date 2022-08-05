import { Model } from '../model/stats.model';

export class Service {
  static async findStats() {
    const servers = await Model.findStats();
    return servers;
  }
}
