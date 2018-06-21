import React from 'react';
import { RequesterInfo } from "../../../../models/userInfo/RequesterInfo";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { Inject } from "react.di";
import { observer } from "mobx-react";
import { ClickablePieChart } from "../charts/ClickablePieChart";
import { MissionState } from "../../../../models/mission/Mission";
import { range } from "../../../../../utils/Range";
import { RouterStore } from "../../../../stores/RouterStore";

interface Props {
  data: RequesterInfo;
}

const ID_PREFIX = "dashboard.requester.";

@observer
export class RequesterMissionChart extends React.Component<Props, {}> {

  @Inject localeStore: LocaleStore;
  @Inject routerStore: RouterStore;

  get(key: string) {
    return this.localeStore.get(ID_PREFIX+key) as string;
  }

  onClick = (item: {name: string, items}) => {
    const state = this.nameMap[item.name];
    this.routerStore.jumpTo("/mission/requester?state="+state);
  };

  nameMap = {
    [this.get("active")]: MissionState.ACTIVE,
    [this.get("pending")]: MissionState.PENDING,
    [this.get("ended")]: MissionState.ENDED

  };


  render() {
    const { data } = this.props;

    const chartData = [
      {name: this.get("active"), items: range(0, data.activeMissionCount)},
      {name: this.get("ended"), items: range(0, data.endedMissionCount)},
      {name: this.get("pending"), items: range(0, data.pendingMissionCount)},
    ];

    return  <ClickablePieChart title={this.localeStore.get(ID_PREFIX+"total") as string}
                                      items={chartData}
                               onClick={this.onClick}
                               />;
  }
}
