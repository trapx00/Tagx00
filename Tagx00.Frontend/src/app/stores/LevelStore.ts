import { Injectable } from "react.di";

@Injectable
export class LevelStore {
  levels: number[];
  exp: number[];

  async getLevelInfo() {
    this.levels = [1, 2, 3];
    this.exp = [0,100,200,300];
  }

  async getNextLevelExp(exp: number) {
    if (!this.levels) {
      await this.getLevelInfo();
    }

    for (let i = 0; i < this.levels.length - 1; i++) {
      if (this.exp[i] <= exp && exp < this.exp[i + 1]) {
        return this.exp[i+1];
      }
    }
    return -1; // max level
  }
}
