import { Injectable } from "react.di";
import { observable } from "mobx";
import { ReactNode } from "react";

export interface NavItemProps {
  path: string;
  iconName?: string;
  id: string;
  match(pathname: string): boolean;
}

@Injectable
export class NavStore {
  @observable navMenuShown: boolean = true;

  @observable currentSubNavs: NavItemProps[] = [];
}
