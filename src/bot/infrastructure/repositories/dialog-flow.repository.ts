import DialogRepository from "../../domain/repositories/dialog.repository";

export default class DialogFlowRepository implements DialogRepository{
    getAnswer({ msg, contextId }: any): Promise<string> {
        return Promise.resolve('Quieres helado')
    }
    
}