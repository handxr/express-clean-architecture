export class EventEntity {
  constructor(
    public id: string,
    public name: string,
    public description: string,
    public date: Date,
    public location: string,
    public creatorId: string,
    public createdAt: Date
  ) {}

  get isPastEvent(): boolean {
    return this.date < new Date();
  }

  get isUpcomingEvent(): boolean {
    return this.date >= new Date();
  }

  get isTodayEvent(): boolean {
    return this.date.toDateString() === new Date().toDateString();
  }

  public static fromObject(
    object: Record<string, unknown> | EventEntity
  ): EventEntity {
    const { id, name, description, date, location, creatorId, createdAt } =
      object;

    return new EventEntity(
      id as string,
      name as string,
      description as string,
      new Date(date as string),
      location as string,
      creatorId as string,
      new Date(createdAt as string)
    );
  }
}
