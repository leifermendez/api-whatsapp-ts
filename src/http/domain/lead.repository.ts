export default interface DbRepository {
  saveRecord({msg, phone, contextId}:{msg:string, phone:string, contextId:string}):Promise<boolean>
}
