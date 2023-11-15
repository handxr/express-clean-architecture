import { EventRoutes } from "../../modules/events";
import { Router } from "express";

export class AppRoutes {
  public static get routes(): Router {
    const router = Router();

    router.use("/api/v1/events", EventRoutes.routes);

    return router;
  }
}
