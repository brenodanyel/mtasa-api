import axios from 'axios';

import { ParseServerList } from '../utils/servers.parser';

export class Model {
  static async findAll() {
    const { data } = await axios(
      {
        url: 'https://master.mtasa.com/ase/mta/',
        responseType: 'arraybuffer',
      },
    );

    const parser = new ParseServerList(data);

    return parser.parse();
  }
}
