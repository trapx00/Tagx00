import React, { ReactNode } from 'react';
import { Instance } from "../../../../models/instance/Instance";
import { ColumnProps } from "antd/es/table";
import { Divider, Table} from 'antd';
import { ID_PREFIX } from "./index";
import { InstanceStateIndicator } from "../../../../components/Mission/InstanceStateIndicator";
import { Link } from 'react-router-dom';
import { LocaleDate, LocaleMessage } from "../../../../internationalization/components";
import { MissionInstanceState } from "../../../../models/instance/MissionInstanceState";

interface Props {
  instances: Instance[];
  showFinalizeModal(instanceId: string, missionId: string): void;
  showFinalizeInfoModal(instance: Instance);
  loading: boolean;
}

const TABLE_TITLE_ID_PREFIX = "missions.requester.instancePanel.table.";

export class InstanceTable extends React.Component<Props, {}> {

  selectActions(item: Instance) {
    const actions: ReactNode[] =  [
      <Link to={`/mission/requester/instance/${item.instanceId}`} key={"seeResult"}>
        <a><LocaleMessage id={TABLE_TITLE_ID_PREFIX + "seeResult"}/></a>
      </Link>
    ];

    switch (item.missionInstanceState) {
      case MissionInstanceState.SUBMITTED:
        actions.push(<Divider key={"splitter1"} type={"vertical"}/>);
        actions.push(<a onClick={() => this.props.showFinalizeModal(item.instanceId, item.missionId)}>
          <LocaleMessage id={TABLE_TITLE_ID_PREFIX + "finalize"}/>
        </a>);
        break;
      case MissionInstanceState.FINALIZED:
        actions.push(<Divider key={"splitter1"} type={"vertical"}/>);
        actions.push(<a key={"seeFinalizeResult"}
                        onClick={() => this.props.showFinalizeInfoModal(item)}>
          <LocaleMessage id={TABLE_TITLE_ID_PREFIX + "finalizeResult"}/>
        </a>);
        break;
    }

    return <span>{actions}</span>;
  }

  render() {

    const columns: ColumnProps<Instance>[] = [
      {
        title: "instanceId",
        dataIndex: "instanceId",
      },
      {
        title: "missionId",
        dataIndex: "missionId",
        render: (_, item) => <Link to={`/mission?missionId=${item.missionId}`}><span>{item.missionId}</span></Link>
      },
      {
        title: "workerUsername",
        dataIndex: "workerUsername",
      },
      {
        title: "missionInstanceState",
        dataIndex: "missionInstanceState",
        render: (_, item) => <InstanceStateIndicator instance={item}/>
      },
      {
        title: "acceptDate",
        dataIndex: "acceptDate",
        render: (_, item) => <LocaleDate formatId={TABLE_TITLE_ID_PREFIX + "dateFormat"} input={item.acceptDate}/>,
        defaultSortOrder: 'descend' as 'descend',
        sorter: (a, b) => a.acceptDate - b.acceptDate
      },
      {
        title: "submitDate",
        dataIndex: "submitDate",
        render: (_, item) => item.submitDate
          ? <LocaleDate formatId={TABLE_TITLE_ID_PREFIX + "dateFormat"} input={item.submitDate}/>
          : <LocaleMessage id={TABLE_TITLE_ID_PREFIX + "inProgress"}/>,
        defaultSortOrder: 'descend' as 'descend',
        sorter: (a, b) => a.submitDate - b.submitDate
      },
      {
        title: "action",
        render: (_, item: Instance) => this.selectActions(item)
      }
    ].map(x => ({...x, key: x.dataIndex, title: <LocaleMessage id={TABLE_TITLE_ID_PREFIX + x.title}/>}));

    return <Table rowKey={"instanceId"} columns={columns}
                  dataSource={this.props.instances}
                  loading={this.props.loading}/>;
  }
}
