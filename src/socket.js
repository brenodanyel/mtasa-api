const udp = require('dgram');

const Parser = require('./parser');

const askServerInfo = (ip, port) => {
  console.log(ip, port);

  return new Promise((resolve, reject) => {
    const socket = udp.createSocket('udp4');

    // see what does 's' means here
    // https://github.com/multitheftauto/mtasa-blue/blob/master/Server/mods/deathmatch/logic/ASE.cpp#L171

    socket.send('s', port, ip, (error) => {
      if (error) return reject(error);
    });

    socket.on('message', (buffer) => {
      const parser = new Parser(buffer);
      const result = parser.parse();
      socket.close();
      return resolve(result);
    });

    setTimeout(() => {
      reject({ status: 408, message: 'request timeout' });
    }, 5000);
  });

};

module.exports = {
  askServerInfo,
};
