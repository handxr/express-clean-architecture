import { CreateEventDto } from "../dtos/create-event.dto";
import { EventEntity } from "../entities/event.entity";

export abstract class EventDatasource {
  abstract createEvent(createEventDto: CreateEventDto): Promise<EventEntity>;
  abstract getEvent(eventId: string): Promise<EventEntity>;
  abstract getEvents(): Promise<EventEntity[]>;
  abstract deleteEvent(eventId: string): Promise<void>;
}
