import React from 'react';
import { Axis as BizAxis, Axis, Chart as BizChart, Coord, Geom, Guide, Label, Legend, Tooltip } from 'bizCharts';
import { DataView } from '@antv/data-set';
import { Inject } from "react.di";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { ClickablePieChart } from "../charts/ClickablePieChart";
import { range } from "../../../../../utils/Range";
import { MissionInstanceState } from "../../../../models/instance/MissionInstanceState";
import { RouterStore } from "../../../../stores/RouterStore";

interface Props {
  acceptMissionCount:number,
  inProgressMissionCount:number,
  completedMissionCount:number,
  abandonedMissionCount:number,
  finalizedMissionCount:number
}

const ID_PREFIX = "dashboard.worker.";

export class WorkerMissionCyclePieChart extends React.Component<Props,{}>{
  @Inject localeStore: LocaleStore;

  @Inject routerStore: RouterStore;

  onClick = (e) => {
    const state = this.nameMap[e.name];
    this.routerStore.jumpTo("/mission/worker?state="+state);
  };

  get(key: string) {
     return this.localeStore.get(`${ID_PREFIX}${key}`) as string;
  }

  nameMap = {
    [this.get("inProgressMissionCount")]: MissionInstanceState.IN_PROGRESS,
    [this.get("completedMissionCount")]: MissionInstanceState.SUBMITTED,
    [this.get("finalizedMissionCount")]: MissionInstanceState.FINALIZED,
    [this.get("abandonedMissionCount")]: MissionInstanceState.ABANDONED,

  };

  render() {
    const data = [
      { name: this.get("inProgressMissionCount"), items: range(0, this.props.inProgressMissionCount)},
      { name: this.get("completedMissionCount"), items: range(0, this.props.completedMissionCount) },
      { name: this.get("finalizedMissionCount"), items: range(0, this.props.finalizedMissionCount) },
      { name: this.get("abandonedMissionCount"), items: range(0, this.props.abandonedMissionCount) },
    ];

    return <ClickablePieChart title={"接受任务状态"} items={data} onClick={this.onClick}/>
  }
}
