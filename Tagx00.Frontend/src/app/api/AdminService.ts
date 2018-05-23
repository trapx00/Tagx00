import { Inject, Injectable } from "react.di";
import { HttpService } from "./HttpService";
import { AdminInfo } from "../models/userInfo/AdminInfo";

@Injectable
export class AdminService {
    constructor(@Inject private http: HttpService){
    }

    async getAdminInfo(): Promise<AdminInfo> {
      const res = await this.http.fetch({
        path: "account/admin",
      });
      return res.response;
    }

}
