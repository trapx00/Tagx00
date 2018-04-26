import { action, computed, observable } from "mobx";
import { User, UserRole } from "../models/user/User";
import { LoginResult } from "../api/UserService";
import { localStorage } from './UiUtil';
import { Injectable } from "react.di";

const USER_LOCALSTORAGE_KEY = "user";

@Injectable
export class UserStore {
  @observable user: User = null;


  @computed get loggedIn() {
    return !!this.user;
  }

  get token() {
    return this.user ? this.user.token : null;
  }

  @computed get isAdmin() {
    return this.user && this.user.role === UserRole.ROLE_ADMIN;
  }

  @action logout() {
    this.user = null;
    this.clearUser();
  };


  @action login(username: string, response: LoginResult) {
    this.user = new User({
      username: username,
      token: response.token,
      role: UserRole[response.jwtRoles[0].roleName],
      email: response.email
    });
    console.log(this.user.role)
  };

  remember() {
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(this.user));
  }

  clearUser() {
    localStorage.removeItem(USER_LOCALSTORAGE_KEY);
  }

  constructor(detectLocalStorage: boolean = true) {
    if (detectLocalStorage) {
      const user = localStorage.getItem(USER_LOCALSTORAGE_KEY);
      if (user) {
        try {
          this.user = new User(JSON.parse(user));
        } catch (ignored) {
          console.log(ignored);
        }
      }
    }
  }
}
