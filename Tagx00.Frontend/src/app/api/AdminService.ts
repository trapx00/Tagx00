import { Inject, Injectable } from "react.di";
import { HttpService } from "./HttpService";
import { AdminInfo } from "../models/admin/AdminInfo";
import { UserInfo } from "../models/userInfo/UserInfo";

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

    async getUsers(): Promise<UserInfo[]> {
        const res = await this.http.fetch({
          path: "account/admin/users"
        });
        return res.response.users;
    }

}
