import DialogRepository from "../../../src/bot/domain/repositories/dialog.repository";

export default class DialogRepositoryMock implements DialogRepository{
    getAnswer({ msg, contextId }: any): Promise<string> {
        return Promise.resolve('Quieres helado')
    }
    
}