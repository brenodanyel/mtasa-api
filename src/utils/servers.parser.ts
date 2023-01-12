import Parser from './parser';
import { Server, Player } from '../types/server.type';

const Flags = {
  ASE_HAS_PLAYER_COUNT: 0x0004,
  ASE_HAS_MAX_PLAYER_COUNT: 0x0008,
  ASE_HAS_GAME_NAME: 0x0010,
  ASE_HAS_SERVER_NAME: 0x0020,
  ASE_HAS_GAME_MODE: 0x0040,
  ASE_HAS_MAP_NAME: 0x0080,
  ASE_HAS_SERVER_VERSION: 0x0100,
  ASE_HAS_PASSWORDED_FLAG: 0x0200,
  ASE_HAS_SERIALS_FLAG: 0x0400,
  ASE_HAS_PLAYER_LIST: 0x0800,
  ASE_HAS_RESPONDING_FLAG: 0x1000,
  ASE_HAS_RESTRICTION_FLAGS: 0x2000,
  ASE_HAS_SEARCH_IGNORE_SECTIONS: 0x4000,
  ASE_HAS_KEEP_FLAG: 0x8000,
  ASE_HAS_HTTP_PORT: 0x080000,
  ASE_HAS_SPECIAL_FLAGS: 0x100000,
};

export class ParseServerList extends Parser {
  public readString() {
    let result = '';

    const length = this.read(1);

    for (let index = 0; index < length; index += 1) {
      const char = this.read(1);
      result += String.fromCharCode(char);
    }

    return result;
  }

  private parse_list_v2() {
    const result: Server[] = [];

    const uiFlags = this.read(4);

    const bHasPlayerCount = (uiFlags & Flags.ASE_HAS_PLAYER_COUNT) !== 0;
    const bHasMaxPlayerCount = (uiFlags & Flags.ASE_HAS_MAX_PLAYER_COUNT) !== 0;
    const bHasGameName = (uiFlags & Flags.ASE_HAS_GAME_NAME) !== 0;
    const bHasName = (uiFlags & Flags.ASE_HAS_SERVER_NAME) !== 0;
    const bHasGameMode = (uiFlags & Flags.ASE_HAS_GAME_MODE) !== 0;
    const bHasMap = (uiFlags & Flags.ASE_HAS_MAP_NAME) !== 0;
    const bHasVersion = (uiFlags & Flags.ASE_HAS_SERVER_VERSION) !== 0;
    const bHasPassworded = (uiFlags & Flags.ASE_HAS_PASSWORDED_FLAG) !== 0;
    const bHasSerials = (uiFlags & Flags.ASE_HAS_SERIALS_FLAG) !== 0;
    const bHasPlayers = (uiFlags & Flags.ASE_HAS_PLAYER_LIST) !== 0;
    const bHasRespondingFlag = (uiFlags & Flags.ASE_HAS_RESPONDING_FLAG) !== 0;
    const bHasRestrictionFlags = (uiFlags & Flags.ASE_HAS_RESTRICTION_FLAGS) !== 0;
    const bHasSearchIgnoreSections = (uiFlags & Flags.ASE_HAS_SEARCH_IGNORE_SECTIONS) !== 0;
    const bHasKeepFlag = (uiFlags & Flags.ASE_HAS_KEEP_FLAG) !== 0;
    const bHasHttpPort = (uiFlags & Flags.ASE_HAS_HTTP_PORT) !== 0;
    const bHasSpecialFlags = (uiFlags & Flags.ASE_HAS_SPECIAL_FLAGS) !== 0;

    this.seek(this.position + 4); // skip sequenceNumber
    this.seek(this.position + 4); // skip uiCount

    while (this.step(6)) {
      const server = <Server>{};

      const startPos = this.position;
      const len = this.read(2);

      const ipPieces: number[] = [];

      for (let i = 0; i < 4; i += 1) {
        const piece = this.read(1);
        ipPieces.push(piece);
      }

      server.ip = ipPieces.reverse().join('.');
      server.port = this.read(2);

      if (bHasPlayerCount) {
        server.playerCount = this.read(2);
      }

      if (bHasMaxPlayerCount) {
        server.playerSlots = this.read(2);
      }

      if (bHasGameName) {
        server.game = this.readString();
      }

      if (bHasName) {
        const name = this.readString();
        server.name = name ? decodeURIComponent(escape(name)) : '';
      }

      if (bHasGameMode) {
        server.gameType = this.readString();
      }

      if (bHasMap) {
        server.mapName = this.readString();
      }

      // this.seek(this._position + 1);

      if (bHasVersion) {
        server.version = this.readString();
      }

      if (bHasPassworded) {
        server.passworded = this.read(1) === 1;
      }

      if (bHasSerials) {
        this.seek(this.position + 1);
      }

      if (bHasPlayers) {
        server.players = [];

        const size = this.read(2);

        for (let i = 1; i <= size; i += 1) {
          const player: Player = {
            name: this.readString(),
          };
          server.players.push(player);
        }
      }

      if (bHasRespondingFlag) {
        this.seek(this.position + 1);
      }

      if (bHasRestrictionFlags) {
        this.seek(this.position + 4);
      }

      if (bHasSearchIgnoreSections) {
        const num = this.read(1);
        this.seek(this.position + 2 * num);
      }

      if (bHasKeepFlag) {
        this.seek(this.position + 1);
      }

      if (bHasHttpPort) {
        server.httpPort = this.read(2);
      }

      if (bHasSpecialFlags) {
        this.seek(this.position + 1);
      }

      this.seek(startPos + len);

      result.push(server);
    }

    return result;
  }

  parse() {
    this.seek(0);

    let version = 0;
    let count = 0;

    count = this.read(2);

    if (count === 0) {
      version = this.read(2);
    }

    if (version === 2) {
      return this.parse_list_v2();
    }

    return [];
  }
}
