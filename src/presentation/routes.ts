import { Router } from "express";

import { EventRoutes } from "./events/routes";

export class AppRoutes {
  public static get routes(): Router {
    const router = Router();

    router.use("/api/v1/events", EventRoutes.routes);

    return router;
  }
}
