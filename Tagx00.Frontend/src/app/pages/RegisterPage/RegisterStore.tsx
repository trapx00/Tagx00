import { action, observable } from "mobx";
import { Inject, Injectable } from "react.di";
import { UserService } from "../../api/UserService";
import { UserRole } from "../../models/user/User";


export interface RegisterFormData {
  role: UserRole;
  username: string;
  password: string;
  email: string;
}

@Injectable
export class RegisterStore {

  constructor(@Inject private userService: UserService) {

  }

  async validateEmailCode(code: string): Promise<number> {
    const res = await this.userService.registerValidate(this.token, code);
    return res.statusCode;
  }

  async submitInfo(info: RegisterFormData) {
    const { username, password, email, role } = info;
    const res = await this.userService.register(username, password, email, role);
    if (res.statusCode === 201) {
      this.token = res.response.token;
    }
    return res.statusCode;
  }

  @observable step: number = 0;
  @observable token: string = "";

  @action public nextStep = () => {
    this.step++;
  };
  @action public backStep = () => {
    this.step--;
  };

  @action clear() {
    this.step = 0;
    this.token = "";
  }
}

