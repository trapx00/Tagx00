import { Inject, Injectable } from "react.di";
import { HttpService } from "./HttpService";
import { PayQueryResponse } from "../models/response/pay/PayQueryResponse";
import { PayResponse } from "../models/response/pay/PayResponse";
import { HttpMethod } from "./utils";

@Injectable
export class PayService {
  constructor(@Inject private http: HttpService) {
  }

  async getCredits(): Promise<PayQueryResponse> {
    const res = await this.http.fetch({
      path: "/pay"
    });
    return res.response;
  }

  async pay(credits: number): Promise<PayResponse> {
    const res = await this.http.fetch({
      path: "/pay",
      body: {credits},
      method: HttpMethod.POST
    });

    return res.response;
  }


}
