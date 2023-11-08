import express, { Application, Request, Response, NextFunction } from "express";
import { LRUCache } from "lru-cache";
import { setRoutes } from "./routes";

class App {
  public app: Application;
  public port: number;
  public cache: LRUCache<string, Record<string, unknown>>;

  constructor() {
    this.app = express();
    this.port = 3000;
    this.cache = new LRUCache({ max: 500 });
    this.config();
    this.routes();
    this.listen();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
    this.app.use(this.cacheMiddleware.bind(this));
  }

  private routes(): void {
    setRoutes(this.app);
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
}

export default new App().app;
