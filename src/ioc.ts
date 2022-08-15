import { ContainerBuilder } from "node-dependency-injection";
import Greeting from "./bot/application/greeting";
import WhatsBus from "./bot/infrastructure/events/whatsapp.events";
import DialogFlowRepository from "./bot/infrastructure/repositories/dialog-flow.repository";
import MySqlRepository from "./bot/infrastructure/repositories/mysql.repository";
import WebWhatsappRepository from "./bot/infrastructure/repositories/web-whatsapp.repository";
import { LeadCreate } from "./http/application/lead.create";
import LeadCtrl from "./http/infrastructure/controller/lead.ctrl";

const container = new ContainerBuilder();

/**
 * BOT
 */

container.register("events.bus", WhatsBus);
const eventBus = container.get("events.bus");

container.register("ws.provider", WebWhatsappRepository);
const wsProvider = container.get("ws.provider");

container.register("db.provider", MySqlRepository);
const dbProvider = container.get("db.provider");

container.register("dialog.provider", DialogFlowRepository);
const dialogProvider = container.get("dialog.provider");

container
  .register("greeting.case", Greeting)
  .addArgument([wsProvider, dbProvider, dialogProvider, eventBus]);

/**
 * HTTP
 */


container
  .register("lead.creator", LeadCreate)
  .addArgument([dbProvider, wsProvider]);

const leadCreator = container.get("lead.creator");

container.register("lead.ctrl", LeadCtrl).addArgument(leadCreator);

export default container;
