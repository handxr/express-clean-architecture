import { CreateEventDto } from "../create-event.dto";

describe("CreateEventDto", () => {
  it("should create a valid CreateEventDto", () => {
    const [errors, eventDto] = CreateEventDto.create({
      name: "Test Event",
      description: "This is a test event",
      date: new Date().toISOString(),
      location: "Test Location",
      creatorId: "1",
    });

    expect(errors.length).toBe(0);
    expect(eventDto).toBeDefined();
    expect(eventDto?.name).toBe("Test Event");
    expect(eventDto?.description).toBe("This is a test event");
    expect(eventDto?.location).toBe("Test Location");
    expect(eventDto?.creatorId).toBe("1");
  });

  it("should return errors if required fields are missing", () => {
    const [errors, eventDto] = CreateEventDto.create({
      name: "",
      description: "",
      date: "",
      location: "",
      creatorId: "",
    });

    expect(errors.length).toBe(5);
    expect(errors).toEqual([
      "name is missing",
      "description is missing",
      "date is missing",
      "location is missing",
      "creatorId is missing",
    ]);
    expect(eventDto).toBeUndefined();
  });
});
