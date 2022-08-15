import { Client, LocalAuth } from "whatsapp-web.js";

import WhatsappRepository from "../../domain/repositories/whatsapp.repository";

/**
 * Extendemos los super poderes de whatsapp-web
 */
class WebWhatsappRepository extends Client implements WhatsappRepository {
  private status = false;
  constructor() {
    super({
      authStrategy: new LocalAuth(),
      puppeteer: { headless: true },
    });

    
    this.on('ready',() => {
      this.status = true
      console.log('LOGIN_READY')
    })

    this.on('auth_failure',() => {
      this.status = false
      console.log('LOGIN_FAIL')
    })


  }
  onMsg({
    msg,
    phone,
  }: {
    msg: string;
    phone: string;
  }): Promise<string | null | undefined> {
    throw new Error("Method not implemented.");
  }

  /**
   * Enviar mensaje de WS
   * @param lead
   * @returns
   */
  async sendMsg({ msg, phone }: { msg: string; phone: string }): Promise<any> {
    try {
      console.log('WS:Enviar', msg, phone)
      if (!this.status) return Promise.resolve({ error: "WAIT_LOGIN" });
      const response = await this.sendMessage(`${phone}@c.us`, msg);
      return { id: response.id.id };
    } catch (e: any) {
      return Promise.resolve({ error: e.message });
    }
  }

  getStatus(): boolean {
    return this.status;
  }


}

export default WebWhatsappRepository;
