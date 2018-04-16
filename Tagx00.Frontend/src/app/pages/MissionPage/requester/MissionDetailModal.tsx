import React from 'react';
import { MissionDetail } from "../../../models/mission/Mission";
import { Modal } from 'antd';
import { Localize } from "../../../internationalization/components";

interface Props {
  shown: boolean;
  detail: MissionDetail;
  onClose: () => void;
}

const ID_PREFIX = "missions.requester.missionDetail.";

const replacements = {
  title: ID_PREFIX + "title"
};

export class MissionDetailModal extends React.Component<Props, {}> {
  render() {
    return <Localize replacements={replacements}>
      {props => <Modal visible={this.props.shown}
                       title={props.title}
                       onOk={this.props.onClose}
                       onCancel={this.props.onClose}
                       destroyOnClose={true}
      >
        {JSON.stringify(this.props.detail)}
      </Modal>}
    </Localize>
  }
}
