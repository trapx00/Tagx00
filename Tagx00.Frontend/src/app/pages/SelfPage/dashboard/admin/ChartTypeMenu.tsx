import React from "react";
import { Icon, Menu } from "antd";
import { observer } from "mobx-react";
import { Link } from 'react-router-dom';
import { Inject } from "react.di";
import { RouterStore } from "../../../../stores/RouterStore";
import { LocaleMessage } from "../../../../internationalization/components";

interface Props {
}

const URL = "/account/admin/dashboard/";

const ID_PREFIX = "admin.menu.";

const tabs = [
  {
    key: "PLAT_INFO",
    icon: "picture",
    textId: ID_PREFIX + "dashboard",
  },
  {
    key: "MISSION_CHART",
    icon: "picture",
    textId: ID_PREFIX + "missionChart",
  },
  {
    key: "INSTANCE_CHART",
    icon: "file-text",
    textId: ID_PREFIX + "instanceChart",
  },
  {
    key: "DATE_CHART",
    icon: "environment-o",
    textId: ID_PREFIX + "dateChart",
  }

];

@observer
export class ChartTypeMenu extends React.Component<Props, {}> {

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
