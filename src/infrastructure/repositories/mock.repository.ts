import { Lead } from "../../domain/lead";
import LeadRepository from "../../domain/lead.repository";

class MockRepository implements LeadRepository {
  getDetail(id: string): Promise<Lead | null | undefined> {
      throw new Error("Method not implemented.");
  }
  save(): Promise<Lead> {
    const MOCK_LEAD: Lead = {
      uuid: "00---000",
      message: "test",
      phone: "00000",
    };
    return Promise.resolve(MOCK_LEAD);
  }
}

export default MockRepository