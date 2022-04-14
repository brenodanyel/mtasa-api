require('dotenv').config();
const express = require('express');

const { askServerInfo } = require('./src/socket');

const app = express();
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));

app.get('/',
  (req, res, next) => {
    const { ip, asePort } = req.query;

    const port = Number(asePort);

    if (!ip) {
      return res.status(400).json({ message: 'invalid ip!' });
    }

    if (!port) {
      return res.status(400).json({ message: 'missing port!' });
    }

    if ((port < 0) || (port > 65536)) {
      return res.status(400).json({ message: 'port should be > 0 and < 65536.' });
    }

    next();
  },
  async (req, res, next) => {
    const { ip, asePort } = req.query;
    const port = Number(asePort);

    try {
      const result = await askServerInfo(ip, port);
      res.status(200).json(result);
    } catch (e) {
      next(e);
    }
  }
);

app.use((error, req, res, next) => {
  if (error.status) {
    return res.status(error.status).json({ message: error.message });
  }

  res.status(500).json({ message: 'internal error' });
});
