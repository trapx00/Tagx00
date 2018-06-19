import React from 'react';
import { LocaleMessage } from "../../../../../internationalization/components/index";
import { MissionBrief } from "../../../../../models/admin/MissionBrief";
import { LocaleStore } from "../../../../../stores/LocaleStore";
import { Inject } from "react.di";
import { Modal, Table } from 'antd';
import { RouterStore } from "../../../../../stores/RouterStore";

export interface MissionTableModalProps {
  title: string;
  data:MissionBrief[];
  shown: boolean;
  onClose():void;
}

const ID_PREFIX = "admin.missionChart.";

export class MissionTableModal extends React.Component<MissionTableModalProps, {}> {

  @Inject localeStore: LocaleStore;
  @Inject routerStore: RouterStore;

  get(key: string) {
    return this.localeStore.get(`${ID_PREFIX}${key}`) as string;
  }

  gotoMissionDetail = (missionId: string) => {
    this.routerStore.jumpTo("/mission?missionId="+missionId);
  };

  render() {

    const columns = [{
      title: this.get("modal.missionId"),
      dataIndex: 'missionId',
      key: 'missionId',
      sorter:true
    }, {
      title: this.get("modal.missionType"),
      dataIndex: 'missionType',
      key: 'missionType',
      render: (item) => this.localeStore.get(`common.missionType.${item}`),
      sorter:true
    },
      {
        title: this.get("modal.missionState"),
        dataIndex: 'missionState',
        key: 'missionState',
        render: (item) => this.localeStore.get(`common.missionState.${item}`),
        sorter:true
      },
      {
        title: this.get("modal.action"),
        key: 'action',
        render: (text, record) => {
          return <span>
      <a onClick={() => this.gotoMissionDetail(record.missionId)}><LocaleMessage id={ID_PREFIX+"modal.detail"}/></a>
    </span>
        },
        sorter:true
      }];

    const data = this.props.data.map((x,i) => ({
      key: i,
      ...x
    }));

    return <Modal
      title={this.props.title}
      visible={this.props.shown}
      onOk={this.props.onClose}
      onCancel={this.props.onClose}
    >
      <Table columns={columns} dataSource={data} />
    </Modal>;
  }
}
