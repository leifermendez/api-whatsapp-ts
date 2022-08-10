import LeadExternal from "../../domain/lead.external";

export class TwilioService implements LeadExternal {
    sendMsg({ message, phone }: { message: string; phone: string; }): Promise<any> {
       return Promise.resolve('SE_ENVIO_CORRECTAMENTE')
    }
    
}