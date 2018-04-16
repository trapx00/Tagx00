import { Inject, Injectable } from "react.di";
import { HttpService } from "./HttpService";
import { PayQueryResponse } from "../models/response/pay/PayQueryResponse";
import { PayResponse } from "../models/response/pay/PayResponse";

@Injectable
export class PayService {
  constructor(@Inject private http: HttpService)  { }

  async getCredits(token: string): Promise<PayQueryResponse> {
    const res = await this.http.fetch({
      path: "/pay",
      token
    });
    return res.response;
  }

  async pay(credits: number, token :string): Promise<PayResponse> {
    const res = await this.http.fetch({
      path: "/pay",
      token,
      body: { credits }
    });

    return res.response;
  }
}
