import { Router } from "express";
import { EventInMemoryDatasourceImpl } from "../../infrastructure/datasources/event.in-memory.datasource.impl";
import { EventRepositoryImpl } from "../../infrastructure/repository/event.repository.impl";
import { EventController } from "./controller";

export class EventRoutes {
  public static get routes(): Router {
    const router = Router();
    const datasource = new EventInMemoryDatasourceImpl();
    const eventRepository = new EventRepositoryImpl(datasource);
    const eventController = new EventController(eventRepository);

    router.get("/", eventController.getEvents.bind(eventController));
    router.post("/", eventController.createEvent.bind(eventController));
    router.get("/:eventId", eventController.getEvent.bind(eventController));
    router.delete(
      "/:eventId",
      eventController.deleteEvent.bind(eventController)
    );

    return router;
  }
}
