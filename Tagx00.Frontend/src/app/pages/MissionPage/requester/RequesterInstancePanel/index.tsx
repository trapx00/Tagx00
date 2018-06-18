import React from 'react';
import { MissionInstanceSearch } from "./MissionInstanceSearch";
import { RequesterService } from "../../../../api/RequesterService";
import { UserStore } from "../../../../stores/UserStore";
import { Inject } from "react.di";
import { message } from 'antd';
import { Instance } from "../../../../models/instance/Instance";
import { LocaleStore } from "../../../../stores/LocaleStore";
import { InstanceTable } from "./InstanceTable";
import { FinalizeInfo, FinalizeInfoModal } from "../finalize/FinalizeInfoModal";
import { FinalizeModal } from "../finalize/FinalizeModal";
import { InstanceStateDiagram } from "./InstanceStateDiagram";

interface Props {
  missionId?: string;
}


interface State {
  loading: boolean;
  instances: Instance[];

  finalizeModalState: {shown: boolean, instanceId: string, missionId: string};
  finalizeInfoState: { shown: boolean, info: FinalizeInfo };
}

export const ID_PREFIX = "missions.requester.instancePanel.";

export class RequesterInstancePanel extends React.Component<Props, State> {

  @Inject requesterService: RequesterService;
  @Inject localeStore: LocaleStore;

  missionId: string = this.props.missionId;

  state = {
    loading: false,
    instances: [],
    finalizeModalState: { shown: false, instanceId: "", missionId: this.props.missionId || ""},
    finalizeInfoState: { shown: false, info: null }
  };

  async load(missionId: string) {

    this.setState({
      loading: true
    });

    try {
      const instances = (await this.requesterService.getAllInstancesByMissionId(missionId)).instances;
      this.setState({
        loading: false,
        instances: instances
      })
    } catch (e) {
      message.error(this.localeStore.get(ID_PREFIX+"missionIdNotFound"));
      this.setState({
        loading: false,
        instances: []
      })
    }
  }



  closeFinalizeModal = () => {
    this.setState({ finalizeModalState: {shown: false, instanceId: "", readonly: true, missionId: ""}});
  };

  refresh = () => {
    this.load(this.missionId);
  };

  closeFinalizeInfoModal = () => {
    this.setState({ finalizeInfoState: {shown : false, info: null}});
  };

  showFinalizeModal = (instanceId: string, missionId: string) => {
    this.setState({ finalizeModalState: { shown: true, instanceId, missionId }});
  };

  showFinalizeInfoModal = (info) => {
    this.setState({ finalizeInfoState: {shown: true, info }});
  };

  componentDidMount() {
    if (this.props.missionId) {
      this.load(this.props.missionId);
    } else {
      this.load("");
    }
  }

  onMissionIdChange = (id: string) => {
    this.missionId = id;
  };


  onSearch = (missionId: string) => {
    this.load(missionId);
  };


  render() {

    return <div>
      <MissionInstanceSearch onSearch={this.onSearch}
                             missionId={this.props.missionId}
                             onMissionIdChange={this.onMissionIdChange}
      />
      <InstanceTable instances={this.state.instances}
                     showFinalizeModal={this.showFinalizeModal}
                     showFinalizeInfoModal={this.showFinalizeInfoModal}
                     loading={this.state.loading}
      />

      {this.state.instances.length >0 &&
      <InstanceStateDiagram instances={this.state.instances}/>
      }

      { this.state.finalizeModalState.shown
      && <FinalizeModal {...this.state.finalizeModalState} close={this.closeFinalizeModal} refresh={this.refresh}/>
      }
      { this.state.finalizeInfoState.shown
      && <FinalizeInfoModal info={this.state.finalizeInfoState.info} close={this.closeFinalizeInfoModal}/>
      }
    </div>
  }
}
