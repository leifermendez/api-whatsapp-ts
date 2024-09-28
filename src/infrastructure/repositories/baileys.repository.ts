import * as Baileys from "@whiskeysockets/baileys";

import LeadExternal from "../../domain/lead-external.repository";

//Silent mode
import pino from "pino";

export class BaileysTransporter implements LeadExternal {
  private sessionName: string = "tokens/default";
  public connection: Baileys.WASocket | null = null;
  public connectionState: Partial<Baileys.ConnectionState> | null = null;
  private isEnd: boolean = false;
  private closedMessage: string = "Connection closed";
  private onReady: Array<(connection: Baileys.WASocket) => void> = [];

  constructor(sessionName: string = "default", private baileys: typeof Baileys = Baileys) {
    this.sessionName = `tokens/${sessionName}`;
    this.start();
  }

  private async getAuth(): Promise<any> {
    try {
      return await this.baileys.useMultiFileAuthState(this.sessionName);
    } catch (error) {
      console.log(error);
    }
  }

  set onready(cb: (conection: Baileys.WASocket) => void) {
    if (this.connectionState?.connection == "open") cb(this.connection!);
    this.onReady.push(cb);
  }

  async start(socketConfig: Baileys.UserFacingSocketConfig = {} as any) {
    try {
      const { saveCreds, state } = await this.getAuth();

      this.connection = this.baileys.makeWASocket({
        printQRInTerminal: true,
        browser: this.baileys.Browsers.macOS("Desktop"),
        //@ts-ignore
        logger: pino({ level: "silent" }),
        ...socketConfig,
        auth: socketConfig.auth || state,
      });
      this.connection.ev.on("creds.update", saveCreds);
      this.connection.ev.on("connection.update", (state) => {
        this.connectionState = state;
        if (state.connection === "open") {
          this.onReady.forEach((cb) => cb(this.connection!));
        }

        if (state.connection != "close") return;
        if (this.isEnd) {
          console.log(this.closedMessage);
          return;
        }
        !this.isEnd && this.reconnect();
      });
    } catch (error) {
      console.error(error);
    }
  }

  end() {
    this.isEnd = true;
    this.connection?.end(undefined);
  }

  private reconnect(socketConfig: Baileys.UserFacingSocketConfig = {} as any) {
    this.start(socketConfig);
    console.log("Reconnecting...");
  }

  async sendMsg({
    message,
    phone,
  }: {
    message: string;
    phone: string;
  }): Promise<any> {
    try {
      const response = await this.connection?.sendMessage(phone + "@c.us", {
        text: message,
      });
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
