import { Request, Response } from "express";
import { CreateEventDto, EventRepository } from "../domain";
import { CustomError } from "../../../shared/domain/errors/custom.error";
import { CreateEvent, DeleteEvent, GetEvent, GetEvents } from "../application";
import { UpdateEvent } from "../application/update-event";
import { UpdateEventDto } from "../domain/update-event.dto";
import { ICacheService } from "../../../shared/domain/interfaces/cache-service";

export class EventController {
  constructor(
    private readonly eventRepository: EventRepository,
    private readonly cacheService: ICacheService
  ) {}

  private handleError(error: unknown, response: Response) {
    if (error instanceof CustomError) {
      return response.status(error.statusCode).json({ message: error.message });
    } else {
      console.log(String(error));
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  public getEvents(request: Request, response: Response) {
    const cachedEvents = this.cacheService.get("events");

    if (cachedEvents) {
      console.log("cached events");
      response.status(200).json(cachedEvents);
    } else {
      new GetEvents(this.eventRepository)
        .execute()
        .then((events) => {
          console.log("saving events in cache");
          this.cacheService.set("events", events);
          response.status(200).json(events);
        })
        .catch((error) => {
          this.handleError(error, response);
        });
    }
  }

  public getEvent(request: Request, response: Response) {
    const { eventId } = request.params;
    const cachedEvent = this.cacheService.get(`event:${eventId}`);

    if (cachedEvent) {
      console.log("cached event");
      response.json(cachedEvent);
    } else {
      new GetEvent(this.eventRepository)
        .execute(eventId)
        .then((event) => {
          console.log("saving event in cache");
          this.cacheService.set(`event:${eventId}`, event);
          return response.json(event);
        })
        .catch((error) => {
          this.handleError(error, response);
        });
    }
  }

  public createEvent(request: Request, response: Response) {
    const [error, createEventDto] = CreateEventDto.create(request.body);

    if (error.length > 0) {
      return response.status(400).json({ message: error });
    }

    new CreateEvent(this.eventRepository)
      .execute(createEventDto!)
      .then((event) => {
        console.log("invalidating cache");
        this.cacheService.del("events");
        return response.status(201).json(event);
      })
      .catch((error) => {
        this.handleError(error, response);
      });
  }

  public updateEvent(request: Request, response: Response) {
    const [error, updateEventDto] = UpdateEventDto.create({
      id: request.params.eventId,
      ...request.body,
    });

    if (error.length > 0) {
      return response.status(400).json({ message: error });
    }

    new UpdateEvent(this.eventRepository)
      .execute(updateEventDto!)
      .then((event) => {
        console.log("invalidating cache");
        this.cacheService.del("events");
        this.cacheService.del(`event:${event.id}`);
        return response.status(200).json(event);
      })
      .catch((error) => {
        this.handleError(error, response);
      });
  }

  public deleteEvent(request: Request, response: Response) {
    const { eventId } = request.params;

    new DeleteEvent(this.eventRepository)
      .execute(eventId)
      .then(() => {
        console.log("invalidating cache");
        this.cacheService.del("events");
        this.cacheService.del(`event:${eventId}`);
        return response.status(204).send();
      })
      .catch((error) => {
        this.handleError(error, response);
      });
  }
}
