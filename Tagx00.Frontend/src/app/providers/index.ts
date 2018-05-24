import { apiServiceProviders } from "../api/ApiServiceProviders";
import { UiStore } from "../stores/UiStore";
import { RouterStore } from "../stores/RouterStore";
import { UserStore } from "../stores/UserStore";
import { LocaleStore } from "../stores/LocaleStore";
import { LevelStore } from "../stores/LevelStore";
import { HomeStore } from "../stores/HomeStore";
import { BrowserStore } from "../stores/BrowserStore";
import { NavStore } from "../stores/NavStore";

export async function initProviders(history) {
  const routerStore = new RouterStore(history);
  const localeStore = new LocaleStore();
  const uiStore = new UiStore();
  const homeStore = new HomeStore();
  await localeStore.init();

  return [
    ...apiServiceProviders,
    {provide: RouterStore, useValue: routerStore},
    {provide: UserStore, useClass: UserStore},
    {provide: UiStore, useValue: uiStore},
    {provide: LocaleStore, useValue: localeStore},
    {provide: LevelStore, useClass: LevelStore},
    {provide: HomeStore, useValue: homeStore},
    {provide: BrowserStore, useClass: BrowserStore},
    {provide: NavStore, useClass: NavStore}
  ]

}
