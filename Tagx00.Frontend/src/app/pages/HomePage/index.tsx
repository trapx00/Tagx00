import React from "react";
import { STORE_ROUTER } from "../../constants/stores";
import { inject } from "mobx-react";
import { RouterStoreProps } from "../../routes/RouterStore";


@inject(STORE_ROUTER)
export class HomePage extends React.Component<RouterStoreProps, any> {
  render() {
    return <div>
      <p>
        this is the true homepage and as you see, it doesn't share the same layout as other pages;
      </p>
      <p onClick={() => this.props[STORE_ROUTER].push("/browse")}>
        Click this to go to browse.
      </p>
    </div>

  }
}
