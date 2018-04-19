import { Inject, Injectable } from "react.di";
import { UserService } from "../api/UserService";
import { UserStore } from "./UserStore";

@Injectable
export class LevelStore {
  @Inject userService: UserService;
  @Inject userStore: UserStore;

  levels: number[];//[0,100,200,300,,,]

  async getLevelInfo() {
    const levelInfo = await this.userService.getLevelInfo(this.userStore.token);
    this.levels= levelInfo.levels;
    this.levels=[0,100,200,300];
  }

  async getNextLevelExp(exp: number) {
    if (!this.levels) {
      await this.getLevelInfo();
    }
    console.log(this.levels);

    for (let i = 0; i < this.levels.length - 1; i++) {
      if (this.levels[i] < exp && exp <= this.levels[i + 1]) {
        return this.levels[i + 1];
      }
    }
    return -1; // max level
  }
}
