import { BehaviorSubject } from "rxjs";

export default class WhatsBus {
  private _events = new BehaviorSubject<any>({event:null, data:null});
  public events$ = this._events.asObservable();

  public sendEvent(event: string, data: any) {
    this._events.next({ event, data });
  }
}
