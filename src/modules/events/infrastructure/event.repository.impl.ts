import { EventDatasource } from "../domain/event.datasource";
import { CreateEventDto } from "../domain/create-event.dto";
import { EventEntity } from "../domain/event.entity";
import { EventRepository } from "../domain/event.repository";
import { UpdateEventDto } from "../domain/update-event.dto";

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

  updateEvent(updateEventDto: UpdateEventDto): Promise<EventEntity> {
    return this.datasource.updateEvent(updateEventDto);
  }
}
