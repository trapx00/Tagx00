import React from 'react';
import { Inject } from "react.di";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { PieChart } from "./PieChart";

interface Props {
  activeMissionCount:number;
  pendingMissionCount:number;
  endedMissionCount:number;
}

const ID_PREFIX = "admin.missionChart.";

export class MissionCyclePieChart extends React.Component<Props,{}>{
  @Inject localeStore: LocaleStore;

  render() {
    console.log(this.props);
    const get = (key: string) => this.localeStore.get(`${ID_PREFIX}${key}`) as string;
    const data = [
      { name: get("activeMissionCount"), count: this.props.activeMissionCount },
      { name: get("pendingMissionCount"), count: this.props.pendingMissionCount },
      { name: get("endedMissionCount"), count: this.props.endedMissionCount },
    ];

    return <PieChart title={get("totalMissionCount")} items={data}/>
  }
}
