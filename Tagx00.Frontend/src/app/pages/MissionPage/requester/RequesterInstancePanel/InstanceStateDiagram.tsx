import React from 'react';
import { Instance } from "../../../../models/instance/Instance";
import { Inject } from "react.di";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { MissionInstanceState } from "../../../../models/instance/MissionInstanceState";
import { ClickablePieChart } from "../../../SelfPage/dashboard/charts/ClickablePieChart";
import { observer } from "mobx-react";
import { range } from "../../../../../utils/Range";


interface Props {
  instances: Instance[];
  onClick(state: MissionInstanceState): void;
}

const ID_PREFIX = "missions.requester.instancePanel.instanceStateDiagram.";

@observer
export class InstanceStateDiagram extends React.Component<Props, {}> {

  @Inject localeStore: LocaleStore;

  get(key: string) {
    return this.localeStore.get(ID_PREFIX+key) as string
  }

  onClick = (item: {name: string, items: number[]}) => {
    const state = this.nameMap[item.name];
    this.props.onClick(state);
  };

  nameMap  = {
    [this.get(MissionInstanceState.IN_PROGRESS)]: MissionInstanceState.IN_PROGRESS,
    [this.get(MissionInstanceState.ABANDONED)]: MissionInstanceState.ABANDONED,
    [this.get(MissionInstanceState.FINALIZED)]: MissionInstanceState.FINALIZED,
    [this.get(MissionInstanceState.SUBMITTED)]: MissionInstanceState.SUBMITTED,
  };

  render() {
    const { instances } = this.props;

    const data = Object.keys(MissionInstanceState).map(x => ({
      name: this.get(x),
      items: range(0,instances.filter(i => i.missionInstanceState === MissionInstanceState[x]).length)
    }));


    return <ClickablePieChart title={this.get("total")}
    items={data}
                              onClick={this.onClick}
    />
  }
}
