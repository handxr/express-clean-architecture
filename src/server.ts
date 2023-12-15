import express, { Application, Router } from "express";
import compression from "compression";
import { EventRoutes } from "./features/events";

import { PORT } from "./config/constants";

export class App {
  public readonly app: Application;
  public readonly port: number;
  public readonly router: Router;

  constructor() {
    this.app = express();
    this.router = Router();
    this.port = PORT;

    this.config();
    this.routes();
    this.listen();
  }

  private config(): void {
    this.app.use(compression());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(this.router);
  }

  private routes(): void {
    this.router.use("/api/v1/events", EventRoutes.routes);
  }

  private listen(): void {
    this.app.listen(this.port, () => {
      console.log(`App listening on port ${this.port}`);
    });
  }

  public startServer(): Application {
    return this.app;
  }
}
