import { EventEntity } from "../entities/event.entity";
import { EventRepository } from "../repository/event.repository";

interface GetEventUseCase {
  execute(eventId: string): Promise<EventEntity>;
}

export class GetEvent implements GetEventUseCase {
  constructor(private readonly repository: EventRepository) {}

  async execute(eventId: string): Promise<EventEntity> {
    return await this.repository.getEvent(eventId);
  }
}
