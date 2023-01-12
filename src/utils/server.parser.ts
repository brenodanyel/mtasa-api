import Parser from './parser';
import { Server, Player } from '../types/server.type';

export class ServerParser extends Parser {
  public readString() {
    let result = '';

    const length = this.read(1);

    for (let index = 1; index < length; index += 1) {
      const char = this.read(1);
      result += String.fromCharCode(char);
    }

    return result;
  }

  public parse() {
    // https://github.com/multitheftauto/mtasa-blue/blob/master/Server/mods/deathmatch/logic/ASE.cpp#L231 (ASE::QueryFull)

    const result = <Server>{};

    this.seek(4); // skip the EYE1

    result.game = this.readString();
    result.port = Number(this.readString());
    result.name = decodeURIComponent(escape(this.readString()));
    result.gameType = this.readString();
    result.mapName = this.readString();
    result.version = this.readString();
    result.passworded = Number(this.readString()) === 1;
    result.playerCount = Number(this.readString());
    result.playerSlots = Number(this.readString());

    result.players = [];

    this.seek(this.position + 1); // skip random reply

    while (this.position < this.buffer.length) {
      const player = <Player>{};

      this.seek(this.position + 1); // skip flags

      player.name = this.readString();

      this.seek(this.position + this.read()); // skip team
      this.seek(this.position + this.read()); // skip skin
      this.seek(this.position + this.read()); // skip "score"

      player.ping = Number(this.readString());

      this.seek(this.position + this.read()); // skip time

      result.players.push(player);
    }

    return result;
  }
}
