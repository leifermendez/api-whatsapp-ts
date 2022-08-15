import LeadExternal from "../domain/lead-external.repository";
import LeadRepository from "../domain/lead.repository";

export class LeadCreate {
  private leadRepository: LeadRepository;
  private leadExternal: LeadExternal;
  constructor(respositories: [LeadRepository, LeadExternal]) {
    const [leadRepository, leadExternal] = respositories;
    this.leadRepository = leadRepository;
    this.leadExternal = leadExternal;
  }

  /**
   * Se debe revisar para separar
   * @param param
   * @returns 
   */
  public async sendMessageAndSave({
    msg,
    phone,
  }: {
    msg: string;
    phone: string;
  }) {
    const responseDbSave = await this.leadRepository.saveRecord({ msg, phone });//TODO DB
    const responseExSave = await this.leadExternal.sendMsg({ message, phone });//TODO enviar a ws
    return {responseDbSave, responseExSave};
  }
}
