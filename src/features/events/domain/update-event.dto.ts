export class UpdateEventDto {
  private constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly date: Date,
    public readonly location: string,
    public readonly creatorId: string
  ) {}

  get values() {
    const returnObject: Record<string, unknown> = {};

    switch (true) {
      case !!this.name: {
        returnObject.name = this.name;
        break;
      }
      case !!this.description: {
        returnObject.description = this.description;
        break;
      }
      case !!this.date: {
        returnObject.date = this.date;
        break;
      }
      case !!this.location: {
        returnObject.location = this.location;
        break;
      }
      case !!this.creatorId: {
        returnObject.creatorId = this.creatorId;
        break;
      }
    }

    return returnObject;
  }

  public static create(
    object: Record<string, unknown>
  ): [string[], UpdateEventDto?] {
    const errors: string[] = [];
    const { id, name, description, date, location, creatorId } = object;

    let newDate: Date | undefined = undefined;

    if (!id) errors.push("id is missing");
    if (!name && !description && !date && !location && !creatorId) {
      errors.push("no values to update");
    }
    if (name && typeof name !== "string") errors.push("name must be a string");
    if (description && typeof description !== "string")
      errors.push("description must be a string");
    if (location && typeof location !== "string")
      errors.push("location must be a string");
    if (creatorId && typeof creatorId !== "string")
      errors.push("creatorId must be a string");
    if (date && typeof date !== "string") {
      errors.push("date must be a string");
    }
    if (date && typeof date === "string") {
      newDate = new Date(date);
      if (Number.isNaN(newDate.getTime()))
        errors.push("date must be a valid date");
    }

    const eventDto =
      errors.length === 0
        ? new UpdateEventDto(
            id as string,
            name as string,
            description as string,
            newDate as Date,
            location as string,
            creatorId as string
          )
        : undefined;

    return [errors, eventDto];
  }
}
