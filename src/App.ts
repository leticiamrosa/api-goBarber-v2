import express from 'express'

import routes from './routes/routes'

class App {
  public server: express.Application;

  public constructor () {
    this.server = express()

    this.middlewares()
    this.routes()
  }

  private middlewares (): void {
    this.server.use(express.json())
  }

  private routes () {
    this.server.use(routes)
  }
}

export default new App().server
