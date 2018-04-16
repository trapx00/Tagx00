import {Injectable} from "react.di";

@Injectable
export class LevelStore {
    levels: number[];

    async getLevelInfo() {
        
    }

    async getNextLevelExp(exp: number) {
        if (!this.levels) {
            await this.getLevelInfo();
        }

        for (let i=0;i<this.levels.length-1;i++) {
            if (this.levels[i] <= exp && exp < this.levels[i+1]) {
                return this.levels[i+1];
            }
        }
        return -1; // max level
    }
}