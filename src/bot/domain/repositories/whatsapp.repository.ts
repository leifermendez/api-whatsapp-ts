import { Message } from "../message";


export default interface WhatsappRepository {
  sendMsg({
    msg,
    phone,
    contextId,
  }: MsgInput): Promise<Message | null | undefined>;
  onMsg({msg, phone}:{msg:string, phone:string}): Promise<string | null | undefined>;
}

interface MsgInput {
  msg: string;
  phone: string;
  contextId: string;
}
