import { Model as ServersModel } from './servers.model';

export class Model {
  static async findStats() {
    const servers = await ServersModel.findAll();

    return servers.reduce(
      (previous, server) => (
        {
          playerCount: previous.playerCount + server.playerCount,
          servers: previous.servers + 1,
        }
      ),
      {
        playerCount: 0,
        servers: 0,
      },
    );
  }
}
