import { EventEntity } from "../entities/event.entity";
import { EventRepository } from "../repository/event.repository";

interface GetEventsUseCase {
  execute(): Promise<EventEntity[]>;
}

export class GetEvents implements GetEventsUseCase {
  constructor(private readonly repository: EventRepository) {}

  async execute(): Promise<EventEntity[]> {
    return await this.repository.getEvents();
  }
}
