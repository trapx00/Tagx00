import { Inject, Injectable } from "react.di";
import { UserService } from "../api/UserService";
import { UserStore } from "./UserStore";
import { User } from "../models/user/User";

@Injectable
export class LevelStore {

  constructor(@Inject private userService: UserService, @Inject private userStore: UserStore) {}

  levels: number[];//[0,100,200,300,,,]

  async getLevelInfo() {
    const levelInfo = await this.userService.getLevelInfo(this.userStore.token);
    this.levels= levelInfo.levels;
  }

  async getNextLevelExp(exp: number) {
    if (!this.levels) {
      await this.getLevelInfo();
    }
    for (let i = 0; i < this.levels.length - 1; i++) {
      if (this.levels[i] < exp && exp <= this.levels[i + 1]) {
        return this.levels[i + 1];
      }
    }
    return -1; // max level
  }
}
