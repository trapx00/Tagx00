import { action, computed, observable, runInAction } from "mobx";
import { LoginResult, UserService } from "../../../api/UserService";


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

const service = new UserService();

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

  @computed get validate() {
    return this.usernameValid && this.passwordValid;
  }
}

export class LoginController {
  @observable state: LoginState;
  @observable fields: LoginFormFields = new LoginFormFields();

  @action public logout = () => {
    this.state = LoginState.NotLoggedIn;
  };

  constructor() {
    this.state = LoginState.NotLoggedIn;
  }

  @computed get loggingIn() {
    return this.state === LoginState.LoggingIn;
  }


  @action public requestLogin = async (username: string, password: string): Promise<LoginResult> => {
    this.state = LoginState.LoggingIn;

    const res = await service.login(username, password);

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
      throw {type: LoginErrorType.ServerError, messages: response.errorDescriptions} as LoginServerError;
    }
  }
}
