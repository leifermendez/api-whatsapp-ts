import DbRepository from "../../../src/bot/domain/repositories/db.repository";

export default class DbRepositoryMock implements DbRepository {
  getAnswer(): Promise<string> {
    return Promise.resolve("Hola soy la respuesta que esperas");
  }
  findLastContact(phone: string): Promise<number> {
    return Promise.resolve(1);
  }
  findLastMsg(
    phone: string
  ): Promise<{ msg: string; step: string; contextId: string }> {
    return Promise.resolve({
      msg: "Hola de nuevo!",
      step: "fisrt",
      contextId: "0000000000000",
    });
  }
  findGreetMessage(): Promise<string> {
    return Promise.resolve("Hola y bienvenido soy el saludo");
  }
  saveRecord({
    msg,
    phone,
    contextId,
  }: {
    msg: string;
    phone: string;
    contextId: string;
  }): Promise<boolean> {
    return Promise.resolve(true);
  }
}
