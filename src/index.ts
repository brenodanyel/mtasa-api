import 'dotenv/config';
import express from 'express';
import cors from 'cors';

import server from './routes/server.route';
import errorMiddleware from './middleware/error.middleware';

const app = express();

const { PORT = 3000 } = process.env;

app.use(cors());
app.use('/server', server);
app.use(errorMiddleware);

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
