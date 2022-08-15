import "dotenv/config";
import { Message } from "../domain/message";
import DbRepository from "../domain/repositories/db.repository";
import DialogRepository from "../domain/repositories/dialog.repository";
import WhatsappRepository from "../domain/repositories/whatsapp.repository";
import WhatsBus from "../infrastructure/events/whatsapp.events";
const GREET_GAP_MIN = process.env.GREET_GAP_MIN || 2;
/**
 * Saludar a contacto que escribe
 */
export default class Greeting {
  private whatsappRepository: WhatsappRepository;
  private dbRepository: DbRepository;
  private dialogRepository: DialogRepository;
  private whatsBus: WhatsBus;

  constructor(
    dependencies: [WhatsappRepository, DbRepository, DialogRepository, WhatsBus]
  ) {
    const [whatsappRepository, dbRepository, dialogRepository, whatsBus] =
      dependencies;
    this.whatsappRepository = whatsappRepository;
    this.dbRepository = dbRepository;
    this.dialogRepository = dialogRepository;
    this.whatsBus = whatsBus;

    this.whatsBus.events$.subscribe(({ event, data }) => {
      if (event === "message") {
        console.log(data.body);
      }
    });
  }

  /**
   * Enviar saludo
   * @param phone
   */
  public async checkIsGreet(phone: string, msg: string) {
    const minsAgo = await this.dbRepository.findLastContact(phone);
    const saveMsg = new Message({ msg, phone });
    await this.dbRepository.saveRecord(saveMsg);
 
    /**
     * Continuamos conversacion o inicamos de nuevo
     */
    if (!minsAgo || minsAgo > GREET_GAP_MIN) {
      const { msgTosend, recordSave } = await this.firstGreet(phone);
      const whatsappMsg = await this.whatsappRepository.sendMsg(msgTosend);
      return { msgTosend, recordSave, whatsappMsg };
    } else {
      const { msgTosend, recordSave } = await this.continueConversation(phone);
      const whatsappMsg = await this.whatsappRepository.sendMsg(msgTosend);
      return { msgTosend, recordSave, whatsappMsg };
    }
  }

  /**
   *
   * @param phone
   * @param contextId
   */
  public async continueConversation(
    phone: string
  ): Promise<{ msgTosend: Message; recordSave: any }> {
    const { msg, contextId } = await this.dbRepository.findLastMsg(phone);
    const nextMsg = await this.dialogRepository.getAnswer({
      msg,
      contextId,
    });

    const msgTosend = new Message({ msg: nextMsg, phone });
    const recordSave = await this.dbRepository.saveRecord(msgTosend);
    return { msgTosend, recordSave };
  }

  /**
   * Enviamos el mensaje de saludo
   * @param phone
   */
  public async firstGreet(
    phone: string
  ): Promise<{ msgTosend: Message; recordSave: any }> {
    const nextMsg = await this.dbRepository.findGreetMessage();
    const msgTosend = new Message({ msg: nextMsg, phone });
    const recordSave = await this.dbRepository.saveRecord(msgTosend);
    return { msgTosend, recordSave };
  }
}
