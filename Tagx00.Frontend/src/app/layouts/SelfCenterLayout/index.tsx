import React from "react";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { Inject } from "react.di";
import { SiderLayout } from "../SiderLayout";
import { SelfSideMenu } from "../../pages/SelfPage/SelfSideMenu";

interface Props {

}

@observer
export class SelfCenterLayout extends React.Component<Props, any> {

  @Inject userStore: UserStore;

  render() {

    if (this.userStore.loggedIn) {
      return <SiderLayout leftSider={<SelfSideMenu/>}>
        {this.props.children}
      </SiderLayout>
    }
     else {
      return "log in first."
    }

  }
}
