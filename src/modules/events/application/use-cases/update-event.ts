import { EventEntity, EventRepository } from "../../domain";
import { UpdateEventDto } from "../../domain/update-event.dto";

interface UpdateEventUseCase {
  execute(updateEventDto: UpdateEventDto): Promise<EventEntity>;
}

export class UpdateEvent implements UpdateEventUseCase {
  constructor(private readonly repository: EventRepository) {}
  async execute(updateEventDto: UpdateEventDto): Promise<EventEntity> {
    return this.repository.updateEvent(updateEventDto);
  }
}
