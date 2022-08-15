import Greeting from "../../../src/bot/application/greeting";
import DbRepository from "../../../src/bot/domain/repositories/db.repository";
import DialogRepository from "../../../src/bot/domain/repositories/dialog.repository";
import WhatsappRepository from "../../../src/bot/domain/repositories/whatsapp.repository";
import WhatsBus from "../../../src/bot/infrastructure/events/whatsapp.events";
import DbRepositoryMock from "../__mocks__/db.repositoryMock";
import DialogRepositoryMock from "../__mocks__/dialog.repositoryMock";
import WhatsappRepositoryMock from "../__mocks__/whatsapp.repositoryMock";

let whatsappRepository: WhatsappRepository;
let dbRepository: DbRepository;
let dialogRepository: DialogRepository;
let greeting: Greeting;
let whatsBus: WhatsBus;

beforeEach(() => {
  whatsappRepository = new WhatsappRepositoryMock();
  dbRepository = new DbRepositoryMock();
  dialogRepository = new DialogRepositoryMock();
  whatsBus = new WhatsBus();
  greeting = new Greeting([
    whatsappRepository,
    dbRepository,
    dialogRepository,
    whatsBus,
  ]);
});

describe(`Test de Greeting`, () => {
  test(`shoud received a object`, async () => {
    const { recordSave } = (await greeting.firstGreet(
      "8888888888888888888"
    )) as any;
    expect(recordSave).toEqual(true);
  });

  test(`continue conversation "Quieres helado"`, async () => {
    const { msgTosend } = await greeting.continueConversation(
      "888888888888888"
    );
    expect(msgTosend.msg).toEqual("Quieres helado");
  });
});
