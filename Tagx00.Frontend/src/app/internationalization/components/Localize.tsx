import React from "react"
import { ReactNode } from "react";
import { inject, observer } from "mobx-react";
import { LocaleStore, ReplacementMap } from "../LocaleStore";
import { STORE_LOCALE } from "../../constants/stores";
import { Inject } from "react.di";

interface LocalizeProps {

  children: (props: any) => ReactNode;
  replacements?: ReplacementMap;
}

@observer
export class Localize<T> extends React.Component<LocalizeProps, {}> {

  @Inject localeStore: LocaleStore;

  render() {
    const childProducer = this.props.children;
    const properties = Object.keys(this.props.replacements)
      .reduce((obj, key) => ({ ...obj, [key]: this.localeStore.get(this.props.replacements[key] as string) }), {});
    return childProducer(properties);
  }
}
