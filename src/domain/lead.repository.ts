import { Lead } from "./lead";

/**
 * Esta la interfaz que debe de cumplir el repositorio de infraestructura
 * mysql o mongo o etc
 */
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
