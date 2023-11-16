import { EventEntity } from "../event.entity";

describe("EventEntity", () => {
  let eventEntity: EventEntity;

  beforeEach(() => {
    eventEntity = new EventEntity(
      "1",
      "Test Event",
      "This is a test event",
      new Date(),
      "Test Location",
      "1",
      new Date()
    );
  });

  it("should create an instance", () => {
    expect(eventEntity).toBeTruthy();
  });

  it("should return false for isPastEvent if the event date is in the future", () => {
    eventEntity.date = new Date(Date.now() + 10_000);
    expect(eventEntity.isPastEvent).toBe(false);
  });

  it("should return true for isPastEvent if the event date is in the past", () => {
    eventEntity.date = new Date(Date.now() - 10_000);
    expect(eventEntity.isPastEvent).toBe(true);
  });

  it("should return true for isUpcomingEvent if the event date is in the future", () => {
    eventEntity.date = new Date(Date.now() + 10_000);
    expect(eventEntity.isUpcomingEvent).toBe(true);
  });

  it("should return false for isUpcomingEvent if the event date is in the past", () => {
    eventEntity.date = new Date(Date.now() - 10_000);
    expect(eventEntity.isUpcomingEvent).toBe(false);
  });

  it("should return true for isTodayEvent if the event date is today", () => {
    eventEntity.date = new Date();
    expect(eventEntity.isTodayEvent).toBe(true);
  });

  it("should return false for isTodayEvent if the event date is not today", () => {
    eventEntity.date = new Date(Date.now() + 86_400_000);
    expect(eventEntity.isTodayEvent).toBe(false);
  });

  it("should create an EventEntity from an object", () => {
    const object = {
      id: "1",
      name: "Test Event",
      description: "This is a test event",
      date: new Date().toISOString(),
      location: "Test Location",
      creatorId: "1",
      createdAt: new Date().toISOString(),
    };

    const createdEventEntity = EventEntity.fromObject(object);

    expect(createdEventEntity).toEqual(eventEntity);
  });
});
