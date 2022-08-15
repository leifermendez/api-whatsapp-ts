import {v4 as uuid} from "uuid"

export class Message {
  readonly uuid: string;
  readonly msg: string;
  readonly phone: string;
  readonly contextId:string

  constructor({ msg, phone }: { msg: string; phone: string }) {
    this.uuid = uuid()
    this.contextId = `context_${uuid()}`
    this.msg = msg
    this.phone = phone
  }
}
