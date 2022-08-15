import { Message } from "../../../src/bot/domain/message";
import WhatsappRepository from "../../../src/bot/domain/repositories/whatsapp.repository";

const MESSAGE_MOCK = new Message({ msg: "Hola msg!", phone: "777777777" });

export default class WhatsappRepositoryMock implements WhatsappRepository {
  sendMsg({ msg, phone, contextId }: any): Promise<Message | null | undefined> {
    return Promise.resolve(MESSAGE_MOCK);
  }
  onMsg({ msg, phone }: any): Promise<string | null | undefined> {
    return Promise.resolve('MESSAGE_MOCK');
  }
}
