import { Router } from "express";
import { eventController } from "../dependencies";

export class EventRoutes {
  public static get routes(): Router {
    const router = Router();

    router.get("/", eventController.getEvents.bind(eventController));
    router.post("/", eventController.createEvent.bind(eventController));
    router.get("/:eventId", eventController.getEvent.bind(eventController));
    router.put("/:eventId", eventController.updateEvent.bind(eventController));
    router.delete(
      "/:eventId",
      eventController.deleteEvent.bind(eventController)
    );

    return router;
  }
}
