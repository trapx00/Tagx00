import { apiServiceProviders } from "./ApiServiceProviders";
import { UiStore } from "../stores/UiStore";
import { RouterStore } from "../stores/RouterStore";
import { UserStore } from "../stores/UserStore";
import { LocaleStore } from "../stores/LocaleStore";
import {LevelStore} from "../stores/LevelStore";

export async function initProviders(history) {
  const userStore = new UserStore();
  const routerStore = new RouterStore(history);
  const localeStore = new LocaleStore();
  const uiStore = new UiStore();
  const levelStore = new LevelStore();
  await localeStore.init();

  return [
    {provide: RouterStore, useValue: routerStore},
    {provide: UserStore, useValue: userStore},
    {provide: UiStore, useValue: uiStore},
    {provide: LocaleStore, useValue: localeStore},
      {provide: LevelStore, useValue: levelStore},
    ...apiServiceProviders
  ]

}