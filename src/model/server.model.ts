import { createSocket } from 'dgram';
import { ServerParser } from '../utils/server.parser';

export class Model {
  static findOne(ip: string, asePort: number) {
    return new Promise((resolve) => {
      const socket = createSocket('udp4');

      // 's' meaning:
      // void ASE::DoPulse()
      // https://github.com/multitheftauto/mtasa-blue/blob/master/Server/mods/deathmatch/logic/ASE.cpp

      socket.send('s', asePort, ip);

      socket.on('message', (buffer: Buffer) => {
        socket.close();

        const parser = new ServerParser(buffer);
        const result = parser.parse();

        resolve({ ...result, ip });
      });
    });
  }
}
