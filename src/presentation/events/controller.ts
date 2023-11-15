import { Request, Response } from "express";
import { EventRepository } from "../../domain/repository/event.repository";
import { GetEvents } from "../../domain/use-cases/get-events";
import { CustomError } from "../../domain/errors/custom.error";
import { GetEvent } from "../../domain/use-cases/get-event";
import { CreateEventDto } from "../../domain/dtos/create-event.dto";
import { CreateEvent } from "../../domain/use-cases/create-event";

export class EventController {
  constructor(private readonly eventRepository: EventRepository) {}

  private handleError(error: unknown, response: Response) {
    if (error instanceof CustomError) {
      return response.status(error.statusCode).json({ message: error.message });
    } else {
      console.log(String(error));
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  public getEvents(request: Request, response: Response) {
    new GetEvents(this.eventRepository)
      .execute()
      .then((events) => {
        response.status(200).json(events);
      })
      .catch((error) => {
        this.handleError(error, response);
      });
  }

  public getEvent(request: Request, response: Response) {
    const { eventId } = request.params;

    new GetEvent(this.eventRepository)
      .execute(eventId)
      .then((event) => {
        return response.json(event);
      })
      .catch((error) => {
        this.handleError(error, response);
      });
  }

  public createEvent(request: Request, response: Response) {
    const [error, createEventDto] = CreateEventDto.create(request.body);

    if (error.length > 0) {
      return response.status(400).json({ message: error });
    }

    new CreateEvent(this.eventRepository)
      .execute(createEventDto!)
      .then((event) => {
        return response.status(201).json(event);
      })
      .catch((error) => {
        this.handleError(error, response);
      });
  }

  public deleteEvent(request: Request, response: Response) {
    const { eventId } = request.params;

    this.eventRepository
      .deleteEvent(eventId)
      .then(() => {
        return response.status(204).send();
      })
      .catch((error) => {
        this.handleError(error, response);
      });
  }
}
