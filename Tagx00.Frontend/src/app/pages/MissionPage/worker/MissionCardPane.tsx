import React from "react";
import { WorkerInstanceCard } from "../../../components/Mission/WorkerInstanceCard";
import { Instance } from "../../../models/instance/Instance";
import { CardPaneLayout } from "../../../layouts/CardPaneLayout";
import { FinalizeInfo, FinalizeInfoModal } from "../requester/finalize/FinalizeInfoModal";

interface Props {
  items: Instance[];

  refresh(): void;
}

interface State {
  info: FinalizeInfo;
}

export class MissionCardPane extends React.Component<Props, State> {

  state = {
    info: null
  };

  showFinalizeInfo = (info: FinalizeInfo)=> {
    this.setState({ info });
  };

  renderItem = (item: Instance) => {
    return <WorkerInstanceCard showFinalizeModal={this.showFinalizeInfo}
      instance={item} refresh={this.props.refresh}/>

  };

  closeFinalizeInfo = () => {
    this.setState({ info: null});
  };

  render() {
    return <div>
      <CardPaneLayout
      dataSource={this.props.items}
      renderItem={this.renderItem}/>
      {this.state.info != null &&
      <FinalizeInfoModal close={this.closeFinalizeInfo} info={this.state.info}/>
      }
    </div>
  }
}
