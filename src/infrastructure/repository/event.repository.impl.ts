import { EventDatasource } from "../../domain/datasources/event.datasource";
import { CreateEventDto } from "../../domain/dtos/create-event.dto";
import { EventEntity } from "../../domain/entities/event.entity";
import { EventRepository } from "../../domain/repository/event.repository";

export class EventRepositoryImpl implements EventRepository {
  constructor(private readonly datasource: EventDatasource) {}
  createEvent(createEventDto: CreateEventDto): Promise<EventEntity> {
    return this.datasource.createEvent(createEventDto);
  }
  getEvent(eventId: string): Promise<EventEntity> {
    return this.datasource.getEvent(eventId);
  }
  getEvents(): Promise<EventEntity[]> {
    return this.datasource.getEvents();
  }
  deleteEvent(eventId: string): Promise<void> {
    return this.datasource.deleteEvent(eventId);
  }
}
