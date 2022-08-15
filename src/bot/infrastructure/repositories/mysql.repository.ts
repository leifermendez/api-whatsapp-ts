import DbRepository from "../../domain/repositories/db.repository";

class MySqlRepository implements DbRepository {
    getAnswer(): Promise<string> {
        return Promise.resolve('Hola y bienvenido!')
    }
    findLastContact(phone: string): Promise<number> {
        return Promise.resolve(0)
    }
    findLastMsg(phone: string): Promise<{ msg: string; step: string; contextId: string; }> {
        return Promise.resolve({msg:'Como estas', step:'1',  contextId:'00000000'})
    }
    findGreetMessage(): Promise<string> {
        return Promise.resolve('Bienvenido!');
    }
    saveRecord({ msg, phone, contextId }: { msg: string; phone: string; contextId: string; }): Promise<boolean> {
        return Promise.resolve(true)
    }

}

export default MySqlRepository