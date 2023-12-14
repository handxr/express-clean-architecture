import { CreateEventDto } from "../../domain/create-event.dto";
import { EventEntity } from "../../domain/event.entity";
import { EventRepository } from "../../domain/event.repository";

interface CreateEventUseCase {
  execute(createEventDto: CreateEventDto): Promise<EventEntity>;
}

export class CreateEvent implements CreateEventUseCase {
  constructor(private readonly repository: EventRepository) {}

  async execute(createEventDto: CreateEventDto): Promise<EventEntity> {
    return await this.repository.createEvent(createEventDto);
  }
}
