import React from "react";
import { observer } from "mobx-react";
import { UserStore } from "../../stores/UserStore";
import { Inject } from "react.di";
import { SidebarLayout } from "../SidebarLayout";
import { SelfSideMenu } from "../../pages/SelfPage/SelfSideMenu";

interface Props {

}

@observer
export class SelfCenterLayout extends React.Component<Props, any> {

  @Inject userStore: UserStore;

  render() {

    if (this.userStore.loggedIn) {
      return <SidebarLayout sideMenu={<SelfSideMenu/>}>
        {this.props.children}
      </SidebarLayout>
    }
     else {
      return "log in first."
    }

  }
}
