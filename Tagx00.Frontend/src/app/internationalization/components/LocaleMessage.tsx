import { inject, observer } from "mobx-react";
import * as React from "react";
import { ReactNode } from "react";
import { STORE_LOCALE } from "../../constants/stores";
import { LocaleStoreProps, Replacement } from "../LocaleStore";


interface LocaleMessageProps extends LocaleStoreProps {
  id: string;
  replacements?: {[s: string]: Replacement}

}

@inject(STORE_LOCALE)
@observer
export class LocaleMessage extends React.Component<LocaleMessageProps, any> {

  render() {
    const locale = this.props[STORE_LOCALE];
    return locale.get(this.props.id, this.props.replacements);
  }
}
