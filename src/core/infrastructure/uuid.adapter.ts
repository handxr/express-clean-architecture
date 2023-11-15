import uuid4 from "uuid4";

export class UuidAdapter {
  public static generate(): string {
    return uuid4();
  }
}
