import React, { ReactNode } from "react";
import { STORE_ROUTER } from "../../../constants/stores";
import { RouterStoreProps } from "../../../routes/RouterStore";
import { inject } from "mobx-react";

interface Props extends RouterStoreProps {
  to: string;
}

@inject(STORE_ROUTER)
export class Link extends React.Component<Props, any> {
  render() {
    const store = this.props[STORE_ROUTER];
    return <a onClick={() => store.jumpTo(this.props.to)}>
      {this.props.children}
      </a>;
  }
}
