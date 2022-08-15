export default interface DbRepository {
  getAnswer(): Promise<string>;
  findLastContact(phone: string): Promise<number>;
  findLastMsg(phone: string): Promise<{ msg: string; step:string, contextId: string }>;
  findGreetMessage(): Promise<string>;
  saveRecord({msg, phone, contextId}:{msg:string, phone:string, contextId:string}):Promise<boolean>
}
