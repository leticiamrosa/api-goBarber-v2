import express from 'express';

class App {
  public server: express.Application;

  public constructor() {
    this.server = express();

    this.middlewares();
  }

  private middlewares(): void {
    this.server.use(express.json());
  }
}

export default new App().server;
