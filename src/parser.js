class Parser {
  constructor(buffer) {
    this.buffer = buffer;
    this.position = 0;
    this.size = buffer.length;
  }

  readInt() {
    return this.buffer[this.position++];
  }

  readString() {
    if (this.position > this.size) {
      return false;
    }

    let result = '';

    const length = this.buffer[this.position];

    for (let index = 1; index < length; index++) {
      const charCode = this.buffer[this.position + index];
      result += String.fromCharCode(charCode);
    }

    this.position += length;

    return result;
  }

  seek(position) {
    if (position > this.size) {
      return false;
    }

    this.position = position;

    return true;
  }

  // https://github.com/multitheftauto/mtasa-blue/blob/master/Server/mods/deathmatch/logic/ASE.cpp#L231 (ASE::QueryFull)
  parse() {
    const result = {};

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

    this.seek(this.position + 1); // skip random reply

    while (this.position < this.size) {
      const player = {};

      this.seek(this.position + 1); // skip flags

      player.nickname = this.readString();

      this.seek(this.position + this.readInt()); // skip team
      this.seek(this.position + this.readInt()); // skip skin
      this.seek(this.position + this.readInt()); // skip "score"

      player.ping = parseInt(this.readString());

      this.seek(this.position + this.readInt()); // skip time

      result.players.push(player);
    }

    return result;
  }
};

module.exports = Parser;
