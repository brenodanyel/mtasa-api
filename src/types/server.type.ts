export type Player = {
  name: string,
  ping?: number,
};

export type Server = {
  name: string,
  ip: string,
  port: number;
  httpPort?: number,
  game: string,
  gameType: string,
  mapName: string,
  version: string,
  passworded: boolean,
  playerCount: number,
  playerSlots: number,
  players?: Player[];
};
