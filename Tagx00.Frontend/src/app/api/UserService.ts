import { BaseService } from "./BaseService";
import { HttpMethod } from "./utils";

export interface LoginResult {
  token: string,
  username: string,
  role: string
}

function encryptPassword(password: string) {
  return password;
}

export class UserService extends BaseService {
  constructor() {
    super("account");
  }

  async login(username: string, password: string) {
    password = encryptPassword(password);

    return await this.fetch({
      route: "login",
      queryParams: {username, password}
    });
  }

  async register(username: string, password: string) {
    password = encryptPassword(password);

    return await this.fetch({
      route: "register",
      body: {username, password},
      method: HttpMethod.POST
    });
  }

}
