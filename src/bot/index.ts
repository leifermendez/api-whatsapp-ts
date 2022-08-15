import Greeting from "./application/greeting";
import container from "../ioc";
import WebWhatsappRepository from "./infrastructure/repositories/web-whatsapp.repository";
import parseNumber from "./infrastructure/utils/parse.number";

const greetingCase = container.get("greeting.case");
const whatsProvider: WebWhatsappRepository = container.get("ws.provider");

class BotWs {
  constructor(
    private whatsProvider: WebWhatsappRepository,
    private greetingCase: Greeting
  ) {
    this.whatsProvider.on("message", ({ body, from }) => {
      const phone = parseNumber(from);
      this.greetingCase.checkIsGreet(phone, body);
    });
  }

  public startBot() {
    this.whatsProvider.initialize();
  }
}

const bot = new BotWs(whatsProvider, greetingCase);
export default bot;
