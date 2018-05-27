import { Inject, Injectable } from "react.di";
import { UserService } from "../api/UserService";
import { UserStore } from "./UserStore";

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
    if (exp <= this.levels[0]) {
      return this.levels[1];
    }
    for (let i = 0; i < this.levels.length - 1; i++) {
      if (exp > this.levels[i] && exp <= this.levels[i + 1]) {
        return this.levels[i + 1];
      }
    }
    return Number.MAX_SAFE_INTEGER;
  }
}
