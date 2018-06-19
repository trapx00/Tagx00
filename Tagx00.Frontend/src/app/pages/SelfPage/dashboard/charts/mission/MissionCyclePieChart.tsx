import React from 'react';
import { Inject } from "react.di";
import { Modal, Divider, Table } from 'antd';
import { LocaleStore } from "../../../../../stores/LocaleStore";
import { PieChart } from "../PieChart";
import { ClickablePieChart } from "../ClickablePieChart";
import { MissionState } from "../../../../../models/mission/Mission";
import { RouterStore } from "../../../../../stores/RouterStore";
import { MissionBrief } from "../../../../../models/admin/MissionBrief";
import { LocaleMessage } from "../../../../../internationalization/components/index";
import { MissionTableModal, MissionTableModalProps } from "./MissionTableModal";

interface Props {
  active: MissionBrief[];
  pending: MissionBrief[];
  ended: MissionBrief[];
}

const ID_PREFIX = "admin.missionChart.";

interface State {
  props: MissionTableModalProps;
}

export class MissionCyclePieChart extends React.Component<Props,State>{
  @Inject localeStore: LocaleStore;
  @Inject routerStore: RouterStore;

  onCancel = () => {
    this.setState({
      props: {...this.state.props, shown: false}
    })
  };


  state = {
    props: {title: "", data: [], shown: false, onClose: this.onCancel}
  };

  onClick = (e: {name: string, items: MissionBrief[]}) => {
    this.setState({
      props: { title: e.name, data: e.items, shown: true, onClose: this.onCancel}
    })
  };

  get(key: string) {
    return this.localeStore.get(`${ID_PREFIX}${key}`) as string;
  }


  map = {
    [MissionState.ACTIVE]: this.get("activeMissionCount"),
    [MissionState.PENDING]: this.get("pendingMissionCount"),
    [MissionState.ENDED]: this.get("endedMissionCount"),
  };

  data = [
    { name: this.map[MissionState.ACTIVE], items: this.props.active },
    { name: this.map[MissionState.PENDING], items: this.props.pending },
    { name: this.map[MissionState.ENDED], items: this.props.ended },
  ];

  gotoMissionDetail = (missionId: string) => {
    this.routerStore.jumpTo("/mission?missionId="+missionId);
  };

  render() {

    return <div>
      <ClickablePieChart title={this.get("totalMissionCount")} items={this.data} onClick={this.onClick}/>
      <MissionTableModal {...this.state.props}/>
    </div>
  }
}
