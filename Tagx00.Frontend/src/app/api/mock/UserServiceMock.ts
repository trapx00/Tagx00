import { Injectable } from "react.di";
import { NetworkResponse } from "../HttpService";
import { UserRegisterResponse, UserService } from "../UserService";
import { UserRole } from "../../models/user/User";
import { LevelInfo } from "../../models/user/LevelInfo";
import { LoginResponse } from "../../models/user/LoginResponse";


const sampleAvatar = "https://en.gravatar.com/userimage/57315252/e9c37404163b4b2e73fd72003e391aac.jpg?size=200";

@Injectable
export class UserServiceMock extends UserService {

  async login(username: string, password: string): Promise<NetworkResponse<LoginResponse>> {

    if (username === "worker") {
      return new NetworkResponse(200, {
        token: "123",
        jwtRoles: [{roleName: UserRole.ROLE_WORKER}],
        email: "1@1.com",
        avatarUrl: sampleAvatar
      })
    }

    else if (username === "admin") {
      return new NetworkResponse(200, {
        token: "123",
        jwtRoles: [{roleName: UserRole.ROLE_ADMIN}],
        email: "1@1.com",
        avatarUrl: sampleAvatar
      })
    }
    return new NetworkResponse(200, {
        token: "123",
        jwtRoles: [{roleName: UserRole.ROLE_REQUESTER}],
        email: "1@1.com",
        avatarUrl: sampleAvatar
      }
    );
  }

  logout() {

  }

  async register(username: string, password: string): Promise<NetworkResponse<UserRegisterResponse>> {
    return new NetworkResponse(201, {
        token: "123",
      }
    );
  }

  async registerValidate(token: string, code: string): Promise<NetworkResponse<LoginResponse>> {

    return new NetworkResponse(200, {
        token: "123",
        jwtRoles: [{roleName: UserRole.ROLE_REQUESTER}],
        email: "1@1.com",
        avatarUrl: sampleAvatar
      }
    );
  }

  async getLevelInfo(): Promise<LevelInfo> {
    return {
      levels: [0, 100, 200, 300]
    } as LevelInfo;
  }

}
