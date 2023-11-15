export class CreateEventDto {
  private constructor(
    public readonly name: string,
    public readonly description: string,
    public readonly date: Date,
    public readonly location: string,
    public readonly creatorId: string
  ) {}

  public static create(
    object: Record<string, unknown>
  ): [string[], CreateEventDto?] {
    const errors: string[] = [];
    const { name, description, date, location, creatorId } = object;

    if (!name) errors.push("name is missing");
    if (!description) errors.push("description is missing");
    if (!date) errors.push("date is missing");
    if (!location) errors.push("location is missing");
    if (!creatorId) errors.push("creatorId is missing");

    const eventDto =
      errors.length === 0
        ? new CreateEventDto(
            name as string,
            description as string,
            new Date(date as string),
            location as string,
            creatorId as string
          )
        : undefined;

    return [errors, eventDto];
  }
}
