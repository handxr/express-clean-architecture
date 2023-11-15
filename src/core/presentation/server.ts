import express, { Application } from "express";

import { AppRoutes } from "./routes";
import { PORT } from "../config/constants";

export class App {
  public readonly app: Application;
  public readonly port: number;

  constructor() {
    this.app = express();
    this.port = PORT;

    this.config();
    this.routes();
    this.listen();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private routes(): void {
    this.app.use(AppRoutes.routes);
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
