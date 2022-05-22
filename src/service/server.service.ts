import udp from 'dgram';
import { timeout } from 'promise-timeout';

import Parser from '../utils/parser';
import { generateError } from '../utils/error';
import { IPlayer } from '../interfaces/IPlayer';
import { IServer } from '../interfaces/IServer';

class ParseServer extends Parser {
  parse() {
    // https://github.com/multitheftauto/mtasa-blue/blob/master/Server/mods/deathmatch/logic/ASE.cpp#L231 (ASE::QueryFull)

    const result = <IServer>{};

    this.seek(4); // skip the EYE1

    result.game = this.readString();
    result.port = parseInt(this.readString());
    result.serverName = this.readString();
    result.gameType = this.readString();
    result.mapName = this.readString();
    result.version = this.readString();
    result.passworded = parseInt(this.readString()) === 1;
    result.playerCount = parseInt(this.readString());
    result.playerSlots = parseInt(this.readString());

    result.players = [];

    this.seek(this._position + 1); // skip random reply

    while (this._position < this._size) {
      const player = <IPlayer>{};

      this.seek(this._position + 1); // skip flags

      player.nickname = this.readString();

      this.seek(this._position + this.readInt()); // skip team
      this.seek(this._position + this.readInt()); // skip skin
      this.seek(this._position + this.readInt()); // skip "score"

      player.ping = parseInt(this.readString());

      this.seek(this._position + this.readInt()); // skip time

      result.players.push(player);
    };

    return result;
  };
}

class Service {
  public static fetchServer = async (ip: string, port: number): Promise<IServer> => {
    console.log(ip, port);

    const promise = new Promise((resolve) => {
      const socket = udp.createSocket('udp4');

      // see what 's' means here: void ASE::DoPulse() - https://github.com/multitheftauto/mtasa-blue/blob/master/Server/mods/deathmatch/logic/ASE.cpp
      socket.send('s', port, ip);

      socket.on('message', (buffer: Buffer) => {
        const parser = new ParseServer(buffer);
        const result = parser.parse();
        resolve(result);
        socket.close();
      });
    });

    try {
      const server = await timeout(promise, 5000);
      return <IServer>server;
    } catch (e) {
      throw generateError(408, 'Request Timeout');
    }
  };
}

export default Service;
