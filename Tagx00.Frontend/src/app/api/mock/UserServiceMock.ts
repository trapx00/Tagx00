import { Injectable } from "react.di";
import { NetworkResponse } from "../HttpService";
import { LoginResult, UserService } from "../UserService";

@Injectable
export class UserServiceMock extends UserService {

  async login(username: string, password: string): Promise<NetworkResponse<LoginResult>> {

    return new NetworkResponse(200, {
        token: "123",
        jwtRoles: [{ authority: "ROLE_WORKER"}],
        email: "1@1.com"
      }
    );
  }

  async register(username: string, password: string) {
    return new NetworkResponse(200, {
        token: "123",
        jwtRoles: [{ authority: "ROLE_WORKER"}],
        email: "1@1.com"
      }
    );
  }

}
