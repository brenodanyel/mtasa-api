import { IPlayer } from './IPlayer';

export interface IServer {
  game: string;
  port: number;
  serverName: string;
  gameType: string;
  mapName: string;
  version: string;
  passworded: boolean;
  playerCount: number;
  playerSlots: number;
  players: IPlayer[];
}
