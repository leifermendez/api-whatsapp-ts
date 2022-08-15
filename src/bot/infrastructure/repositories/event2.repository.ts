import EventEmitter2, { event, Listener, ListenerFn, OnOptions } from "eventemitter2";
import EventRepository from "../../domain/repositories/events.repository";

export default class Event2 extends EventEmitter2 implements EventRepository {
  onMsg(payload: any): Event {
    throw new Error("Method not implemented.");
  }

}
