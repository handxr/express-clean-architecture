import { CreateEventDto } from "../dtos/create-event.dto";
import { EventEntity } from "../entities/event.entity";
import { EventRepository } from "../repository/event.repository";

interface CreateEventUseCase {
  execute(createEventDto: CreateEventDto): Promise<EventEntity>;
}

export class CreateEvent implements CreateEventUseCase {
  constructor(private readonly repository: EventRepository) {}

  async execute(createEventDto: CreateEventDto): Promise<EventEntity> {
    return await this.repository.createEvent(createEventDto);
  }
}
