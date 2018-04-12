import React from "react";
import { WorkerInstanceCard } from "../../../components/Mission/WorkerInstanceCard";
import { Instance } from "../../../models/instance/Instance";
import { CardPaneLayout } from "../../../layouts/CardPaneLayout";

interface Props {
  items: Instance[];

}

export class MissionCardPane extends React.Component<Props, any> {
  render() {
    return <CardPaneLayout
      dataSource={this.props.items}
      renderItem={(item: Instance) => (
          <WorkerInstanceCard instance={item}/>
      )}
    />
  }
}
