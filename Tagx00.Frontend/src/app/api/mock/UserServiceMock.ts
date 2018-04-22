import { Injectable } from "react.di";
import { NetworkResponse } from "../HttpService";
import { LoginResult, UserRegisterConfirmationResponse, UserRegisterResponse, UserService } from "../UserService";
import { UserRole } from "../../models/user/User";
import { HttpMethod } from "../utils";
import { LevelInfo } from "../../models/user/LevelInfo";

@Injectable
export class UserServiceMock extends UserService {

  async login(username: string, password: string): Promise<NetworkResponse<LoginResult>> {

    if (username === "worker") {
      return new NetworkResponse(200, {
        token: "123",
        jwtRoles: [{roleName: UserRole.ROLE_WORKER}],
        email: "1@1.com"
      })
    }

    else if(username === "admin") {
        return new NetworkResponse(200, {
            token: "123",
            jwtRoles: [{roleName: UserRole.ROLE_ADMIN}],
            email: "1@1.com"
        })
    }
    return new NetworkResponse(200, {
        token: "123",
        jwtRoles: [{ roleName: UserRole.ROLE_REQUESTER}],
        email: "1@1.com"
      }
    );
  }

  async register(username: string, password: string): Promise<NetworkResponse<UserRegisterResponse>> {
    return new NetworkResponse(201, {
        token: "123",
      }
    );
  }

  async registerValidate(token: string, code: string): Promise<NetworkResponse<UserRegisterConfirmationResponse>> {

    return new NetworkResponse(200, {
        token: "123",
        jwtRoles: [{ authority: UserRole.ROLE_REQUESTER}],
        email: "1@1.com"
      }
    );
  }

  async getLevelInfo(token: string): Promise<LevelInfo> {
    return {
      levels: [0, 100, 200, 300]
    } as LevelInfo;
  }

}
