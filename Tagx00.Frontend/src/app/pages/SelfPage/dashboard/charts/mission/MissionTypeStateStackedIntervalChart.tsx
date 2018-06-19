import React from 'react';
import { MissionState, MissionType } from "../../../../../models/mission/Mission";
import { Inject } from "react.di";
import { LocaleStore } from "../../../../../stores/LocaleStore";
import { MissionTableModal, MissionTableModalProps } from "./MissionTableModal";
import { StackedIntervalChart } from "../StackedIntervalChart";
import { MissionBrief } from "../../../../../models/admin/MissionBrief";
import { flatten, objectValues } from "../../../../../../utils/Array";

interface Props {
  data: {[missionType in MissionType]: { active: MissionBrief[], pending: MissionBrief[], ended: MissionBrief[]}};
}

interface State {
  props: MissionTableModalProps;
}

export class MissionTypeStateStackedIntervalChart extends React.Component<Props, State> {

  @Inject localeStore: LocaleStore;

  onCancel = ()=> {
    this.setState({
      props: {...this.state.props, shown: false}
    });
  };

  state = {
    props: {title: "", data: [], shown: false, onClose: this.onCancel }
  };


  onClick = (name: string, x: string)=> {

    const map = Object.keys(MissionType).reduce((prev, curr)=>({...prev, [this.localeStore.get(`common.missionType.${curr}`) as string]: curr}),{});

    const missionType = map[x];

    const data= flatten(objectValues(this.props.data[missionType])) as any;


    this.setState({
      props: {title: x, data: data, onClose: this.onCancel, shown: true}
    });
  };

  render() {
    const map = {
      [MissionState.ACTIVE]: "active",
      [MissionState.ENDED]: "ended",
      [MissionState.PENDING]: "pending"
    };
    const data = Object.keys(MissionState).map(x => {
      const data = {} as any;
      for (const type of Object.keys(MissionType)) {
        data[this.localeStore.get(`common.missionType.${type}`) as string] = this.props.data[type][map[x]].length;
      }
      return { name: this.localeStore.get("common.missionState."+x) as string, data};
    });
    return <div>
      <StackedIntervalChart data={data} onClick={this.onClick}/>
      <MissionTableModal {...this.state.props}/>
    </div>
  }
}
