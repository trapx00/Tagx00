import { PayService } from "../PayService";
import { PayQueryResponse } from "../../models/response/pay/PayQueryResponse";
import { PayResponse } from "../../models/response/pay/PayResponse";

export class PayServiceMock extends PayService {

  async getCredits(): Promise<PayQueryResponse> {
    return { credits: 1};
  }

  async pay(credits: number): Promise<PayResponse> {
    return { remainingCredits: 1};
  }
}
