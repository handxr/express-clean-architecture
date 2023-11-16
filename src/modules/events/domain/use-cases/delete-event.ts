import { EventRepository } from "../event.repository";

interface DeleteEventUseCase {
  execute(eventId: string): Promise<void>;
}

export class DeleteEvent implements DeleteEventUseCase {
  constructor(private readonly repository: EventRepository) {}

  async execute(eventId: string): Promise<void> {
    return await this.repository.deleteEvent(eventId);
  }
}
