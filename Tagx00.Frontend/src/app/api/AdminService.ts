import { Inject, Injectable } from "react.di";
import { HttpService } from "./HttpService";
import { AdminInfo } from "../models/userInfo/AdminInfo";

@Injectable
export class AdminService {

  private cache: AdminInfo;

    constructor(@Inject private http: HttpService){
    }

    async getAdminInfo(): Promise<AdminInfo> {

      if (!this.cache) {
        const res = await this.http.fetch({
          path: "account/admin",
        });
        this.cache = res.response;
      }

      return this.cache;

    }

}
