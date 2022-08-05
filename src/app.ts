import express, { Express, Router } from 'express';
import cors from 'cors';
import { errorMiddleware } from './utils/error';

export class App {
  private app: Express;

  constructor() {
    this.app = express();
    this.app.use(cors());

    this.app.get('/', (_req, res) => res.redirect('https://github.com/brenodanyel/mtasa-api'));
  }

  public addRoute(path: string, router: Router) {
    this.app.use(path, router, errorMiddleware);
  }

  public listen(port: number) {
    this.app.listen(port, () => console.log(`Listening on port ${port}`));
  }
}
