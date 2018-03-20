import { action, observable } from "mobx";
import { STORE_UI } from "../constants/stores";

export class UiStore {
  @observable loginModalShown: boolean;

  @action toggleLoginModalShown = () => {
    this.loginModalShown = !this.loginModalShown;
  }
}

export interface UiStoreProps {
  [STORE_UI]?: UiStore;
}
