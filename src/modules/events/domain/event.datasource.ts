import { CreateEventDto } from "./create-event.dto";
import { EventEntity } from "./event.entity";

export abstract class EventDatasource {
  abstract createEvent(createEventDto: CreateEventDto): Promise<EventEntity>;
  abstract getEvent(eventId: string): Promise<EventEntity>;
  abstract getEvents(): Promise<EventEntity[]>;
  abstract deleteEvent(eventId: string): Promise<void>;
}
