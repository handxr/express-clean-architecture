import { CreateEventDto, EventDatasource, EventEntity } from "../../domain";
import { UpdateEventDto } from "../../domain/update-event.dto";
import { UuidAdapter } from "../../../shared/infrastructure/adapters/uuid.adapter";

export class EventInMemoryDatasourceImpl implements EventDatasource {
  private readonly events: EventEntity[] = [];

  constructor() {
    this.createEventsSeed();
  }

  private createEventsSeed(): void {
    const event1 = new EventEntity(
      UuidAdapter.generate(),
      "Event 1",
      "Event 1 description",
      new Date("2021-10-10"),
      "Event 1 location",
      "1",
      new Date()
    );
    const event2 = new EventEntity(
      UuidAdapter.generate(),
      "Event 2",
      "Event 2 description",
      new Date("2021-10-11"),
      "Event 2 location",
      "1",
      new Date()
    );
    const event3 = new EventEntity(
      UuidAdapter.generate(),
      "Event 3",
      "Event 3 description",
      new Date("2021-10-12"),
      "Event 3 location",
      "1",
      new Date()
    );
    const event4 = new EventEntity(
      UuidAdapter.generate(),
      "Event 4",
      "Event 4 description",
      new Date("2021-10-13"),
      "Event 4 location",
      "1",
      new Date()
    );
    const event5 = new EventEntity(
      UuidAdapter.generate(),
      "Event 5",
      "Event 5 description",
      new Date("2021-10-14"),
      "Event 5 location",
      "1",
      new Date()
    );
    this.events.push(event1, event2, event3, event4, event5);
  }

  public async createEvent(
    createEventDto: CreateEventDto
  ): Promise<EventEntity> {
    const event = new EventEntity(
      UuidAdapter.generate(),
      createEventDto.name,
      createEventDto.description,
      createEventDto.date,
      createEventDto.location,
      createEventDto.creatorId,
      new Date()
    );
    this.events.push(event);
    return EventEntity.fromObject(event);
  }
  public async getEvent(eventId: string): Promise<EventEntity> {
    const event = this.events.find((event) => event.id === eventId);

    if (!event) throw new Error(`Event with id ${eventId} not found`);

    return EventEntity.fromObject(event);
  }
  public async getEvents(): Promise<EventEntity[]> {
    return this.events.map((event) => EventEntity.fromObject(event));
  }
  public async deleteEvent(eventId: string): Promise<void> {
    const index = this.events.findIndex((event) => event.id === eventId);
    this.events.splice(index, 1);
  }
  public async updateEvent(
    updateEventDto: UpdateEventDto
  ): Promise<EventEntity> {
    const event = this.events.find((event) => event.id === updateEventDto.id);

    if (!event) throw new Error(`Event with id ${updateEventDto.id} not found`);

    event.name = updateEventDto.name ?? event.name;
    event.description = updateEventDto.description ?? event.description;
    event.date = updateEventDto.date ?? event.date;
    event.location = updateEventDto.location ?? event.location;
    event.creatorId = updateEventDto.creatorId ?? event.creatorId;

    return EventEntity.fromObject(event);
  }
}
