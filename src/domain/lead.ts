import { v4 as uuid } from "uuid";

export class Lead {
  readonly uuid: string;
  readonly message: string;
  readonly phone: string;

  constructor({ message, phone }: { message: string; phone: string }) {
    this.uuid = uuid();
    this.message = message;
    this.phone = phone;
  }
}
