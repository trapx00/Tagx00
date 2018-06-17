import React from "react";
import { Icon, Menu } from "antd";
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { Inject } from "react.di";
import { RouterStore } from "../../../../stores/RouterStore";
import { LocaleMessage } from "../../../../internationalization/components";

interface Props {
}

const URL = "/self/dashboard/";

const ID_PREFIX = "admin.menu.";

const tabs = [
  // {
  //   key: "platform",
  //   icon: "picture",
  //   textId: ID_PREFIX + "dashboard",
  // },
  {
    key: "mission",
    icon: "picture",
    textId: ID_PREFIX + "missionChart",
  },
  {
    key: "instance",
    icon: "file-text",
    textId: ID_PREFIX + "instanceChart",
  },
  {
    key: "user",
    icon: "user",
    textId: ID_PREFIX + "user"
  },
  {
    key: "credits",
    icon: "shopping-cart",
    textId: ID_PREFIX + "credits"
  }
];

@observer
export default class ChartTypeMenu extends React.Component<Props, {}> {

  @Inject routerStore: RouterStore;

  onClick = (e) => {
    this.routerStore.jumpTo(URL + e.key);
  };

  render() {
    const pathArray = this.routerStore.path.split("/");
    const currentTab = pathArray[pathArray.length - 1];
    return <Menu onClick={this.onClick}
                 selectedKeys={[currentTab]}
                 mode="horizontal">

      {tabs.map(x =>
        <Menu.Item key={x.key}>
          <Icon type={x.icon}/>
          <LocaleMessage id={x.textId}/>
        </Menu.Item>)}
    </Menu>
  }
}
