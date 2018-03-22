import React from "react"
import { ReactNode } from "react";
import { inject, observer } from "mobx-react";
import { ReplacementMap } from "../LocaleStore";
import { STORE_LOCALE } from "../../constants/stores";

interface LocalizeProps {

  children: (props: any) => ReactNode;
  replacements?: ReplacementMap;
}

@inject(STORE_LOCALE)
@observer
export class Localize<T> extends React.Component<LocalizeProps, {}> {
  render() {
    const locale = this.props[STORE_LOCALE];
    const childProducer = this.props.children;
    const properties = Object.keys(this.props.replacements)
      .reduce((obj, key) => ({ ...obj, [key]: locale.get(this.props.replacements[key]) }), {});
    return childProducer(properties);
  }
}
