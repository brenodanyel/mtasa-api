import 'dotenv/config';
import { App } from './app';

import server from './routes/server.route';
import servers from './routes/servers.route';

const { PORT = 3000 } = process.env;

const app = new App();

app.addRoute('/server', server);
app.addRoute('/servers', servers);

app.listen(PORT as number);
