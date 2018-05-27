import React from "react";
import { Icon, Menu } from "antd";
import { MissionType } from "../../../../models/mission/Mission";
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { Inject } from "react.di";
import { RouterStore } from "../../../../stores/RouterStore";
import { LocaleMessage } from "../../../../internationalization/components";

interface Props {
}

const URL = "/mission/requester/create/";

const ID_PREFIX = "missions.createMission.menu.";

const tabs = [
  {
    key: MissionType.IMAGE,
    icon: "picture",
    textId: ID_PREFIX + "IMAGE",
  },
  {
    key: MissionType.TEXT,
    icon: "file-text",
    textId: ID_PREFIX + "TEXT",
  }
];

@observer
export class MissionTypeMenu extends React.Component<Props, {}> {

  @Inject routerStore: RouterStore;

  onClick = (e) => {
    this.routerStore.jumpTo(URL + e.key);
  };

  render() {
    const pathArray = this.routerStore.path.split("/");
    const currentTab = pathArray[pathArray.length - 1];
    return <Menu onClick={this.onClick}
                 selectedKeys={[currentTab.toUpperCase()]}
                 mode="horizontal">

      {tabs.map(x =>
        <Menu.Item key={x.key}>
          <Icon type={x.icon}/>
          <LocaleMessage id={x.textId}/>
        </Menu.Item>)}
    </Menu>
  }
}
