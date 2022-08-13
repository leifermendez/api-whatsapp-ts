import { ContainerBuilder } from "node-dependency-injection";
import { LeadCreate } from "../application/lead.create";
import LeadCtrl from "./controller/lead.ctrl";
import MetaRepository from "./repositories/meta.repository";
import MockRepository from "./repositories/mock.repository";
import TwilioService from "./repositories/twilio.repository";
import WsTransporter from "./repositories/ws.external";

const container = new ContainerBuilder();

/**
 * Inicamos servicio de WS / Bot / Twilio
 */
container.register("ws.transporter", WsTransporter);
const wsTransporter = container.get("ws.transporter");

container.register("db.repository", MockRepository);
const dbRepository = container.get("db.repository");

container
  .register("lead.creator", LeadCreate)
  .addArgument([dbRepository, wsTransporter]);

const leadCreator = container.get("lead.creator");

container.register("lead.ctrl", LeadCtrl).addArgument(leadCreator);

export default container;
