import { action, computed, observable, runInAction } from "mobx";
import { LoginResult, UserService } from "../../../api/UserService";
import { UserStore } from "../../../stores/UserStore";
import { Inject, Injectable } from "react.di";


export enum LoginState {
  NotLoggedIn,
  LoggingIn,
  LoggedIn
}


export enum LoginErrorType {
  WrongCredential, ServerError, NetworkError
}

export interface LoginError {
  type: LoginErrorType
}

export interface LoginServerError extends LoginError {
  type: LoginErrorType.ServerError,
  messages: string[]
}

export interface LoginNetworkError extends LoginError {
  type: LoginErrorType.NetworkError;
  error: any
}


export class LoginFormFields {
  @observable username: string;
  @observable password: string;
  @observable remember: boolean;
  @observable loginAttempted = false;

  @computed get usernameValid() {
    return !this.loginAttempted || !!this.username;
  }

  @computed get passwordValid() {
    return !this.loginAttempted || !!this.password;
  }

  @computed get valid() {
    return this.usernameValid && this.passwordValid;
  }
}

@Injectable
export class LoginController {
  @observable state: LoginState;
  @observable fields: LoginFormFields = new LoginFormFields();

  @action public logout = () => {
    this.state = LoginState.NotLoggedIn;
  };

  constructor(@Inject private userService: UserService) {
    this.state = LoginState.NotLoggedIn;
  }

  @computed get loggingIn() {
    return this.state === LoginState.LoggingIn;
  }

  async doLogin(userStore: UserStore) {
    try {
      const res = await this.requestLogin(this.fields.username, this.fields.password);
      userStore.login(this.fields.username, res);
      if (this.fields.remember) {
        userStore.remember();
      }
    } catch (e) {
      console.log(e);
      throw e;
    }
  }

  @action public requestLogin = async (username: string, password: string): Promise<LoginResult> => {
    this.state = LoginState.LoggingIn;

    const res = await this.userService.login(username, password);

    const {statusCode, response, error, ok} = res;

    if (ok) {
      return runInAction("requestLogin success", () => {
        this.state = LoginState.LoggedIn;
        return response;
      });
    }
    runInAction("requestLogin failed", () => {
      this.state = LoginState.NotLoggedIn;
    });
    if (statusCode === 401) {
      throw {type: LoginErrorType.WrongCredential};
    } else if (error.isNetworkError) {
      throw {type: LoginErrorType.NetworkError, error: error.info};
    } else {
      throw {type: LoginErrorType.ServerError, messages: (response as any).errorDescriptions} as LoginServerError;
    }
  }
}
