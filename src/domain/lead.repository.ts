import { Lead } from "./lead";

export default interface LeadRepository {
  save({
    message,
    phone,
  }: {
    message: string;
    phone: string;
  }): Promise<Lead | undefined | null>;
  getDetail(id:string):Promise<Lead | null | undefined>
}
