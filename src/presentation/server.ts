import express, { Application, Request, Response, NextFunction } from "express";
import { LRUCache } from "lru-cache";

import {
  INVALIDATE_CACHE_METHODS,
  InvalidateCacheMethod,
} from "../utils/constants";
import { AppRoutes } from "./routes";
import { PORT } from "../config/constants";

export class App {
  public readonly app: Application;
  public readonly port: number;
  public readonly cache: LRUCache<string, Record<string, unknown>>;

  constructor() {
    this.app = express();
    this.port = PORT;
    this.cache = new LRUCache({ max: 500 });
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

  private cacheMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const key = request.originalUrl;
    const cachedResponse = this.cache.get(key);

    if (cachedResponse) {
      console.log("Cache hit");
      response.send(cachedResponse);
    } else {
      const send = response.send;
      response.send = (body) => {
        this.cache.set(key, body);
        return send.call(response, body);
      };
      next();
    }
  }

  private invalidateCacheMiddleware(
    request: Request,
    response: Response,
    next: NextFunction
  ): void {
    const key = request.originalUrl;
    const method = request.method;

    if (INVALIDATE_CACHE_METHODS.includes(method as InvalidateCacheMethod)) {
      console.log("Cache invalidated");
      this.cache.delete(key);
    }

    next();
  }

  public startServer(): Application {
    return this.app;
  }
}
