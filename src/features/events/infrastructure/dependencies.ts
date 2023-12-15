import { CacheService } from "../../../shared/infrastructure/services/cache.service";
import { EventController } from "./controller";
import { EventInMemoryDatasourceImpl } from "./event.in-memory.datasource.impl";

export const eventRepository = new EventInMemoryDatasourceImpl();
export const cacheService = new CacheService();
export const eventController = new EventController(
  eventRepository,
  cacheService
);
