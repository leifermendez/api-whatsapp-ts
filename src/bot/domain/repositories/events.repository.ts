export default interface EventRepository {
  onMsg(payload: any): Event;
  on(event: string, payload: any): any;
}
