import { HttpService, NetworkResponse } from "./HttpService";
import { HttpMethod } from "./utils";
import { Inject, Injectable } from "react.di";

export interface LoginResult {
  token: string,
  jwtRoles: { authority: string }[];
  email: string;
}

function encryptPassword(password: string) {
  return password;
}

@Injectable
export class UserService {

  constructor(@Inject private http: HttpService) { }

  async login(username: string, password: string): Promise<NetworkResponse<LoginResult>> {
    password = encryptPassword(password);

    return await this.http.fetch({
      path: "account/login",
      queryParams: {username, password}
    });
  }

  async register(username: string, password: string) {
    password = encryptPassword(password);

    return await this.http.fetch({
      path: "account/register",
      body: {username, password},
      method: HttpMethod.POST
    });
  }

}
