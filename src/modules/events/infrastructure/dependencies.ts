import { CacheService } from "../../shared/infrastructure/services/cache.service";
import { EventController } from "./framework";
import {
  EventInMemoryDatasourceImpl,
  EventRepositoryImpl,
} from "./repositories";

export const datasource = new EventInMemoryDatasourceImpl();
export const eventRepository = new EventRepositoryImpl(datasource);
export const cacheService = new CacheService();
export const eventController = new EventController(
  eventRepository,
  cacheService
);
