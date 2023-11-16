import { EventEntity, EventRepository } from "..";
import { UpdateEventDto } from "../update-event.dto";

interface UpdateEventUseCase {
  execute(updateEventDto: UpdateEventDto): Promise<EventEntity>;
}

export class UpdateEvent implements UpdateEventUseCase {
  constructor(private readonly repository: EventRepository) {}
  async execute(updateEventDto: UpdateEventDto): Promise<EventEntity> {
    return this.repository.updateEvent(updateEventDto);
  }
}
