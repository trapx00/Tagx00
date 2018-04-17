import React, { ReactNode } from 'react';
import { LocaleDate, LocaleMessage, Localize } from "../../../internationalization/components";
import { Input, Table, Divider } from 'antd';
import { Instance } from "../../../models/instance/Instance";
import { Inject } from "react.di";
import { RequesterService } from "../../../api/RequesterService";
import { UserStore } from "../../../stores/UserStore";
import { Link } from 'react-router-dom';
import { ColumnProps } from "antd/es/table";
import { InstanceStateIndicator } from "../../../components/Mission/InstanceStateIndicator";
import styled from "styled-components";
import { MissionInstanceState } from "../../../models/instance/MissionInstanceState";
import { FinalizeModal } from "./finalize/FinalizeModal";

const {Search} = Input;

interface Props {
  missionId?: string;
}

interface State {
  loading: boolean;
  missionId: string;
  data: Instance[];
  finalizeModalState: {shown: boolean, instanceId: string, readonly: boolean}
}

const ID_PREFIX = "missions.requester.instancePanel.";


const placements = {
  search: {
    placeholder: ID_PREFIX + "search.placeholder"
  }
};

const Container = styled.div`
  & > * {
    margin-bottom: 8px;
  }
`;


function selectActions(item: Instance, showFinalizeModal: (readonly: boolean, instanceId: string) => void) {
  const actions: ReactNode[] =  [
    <Link to={`/mission/requester/instance/${item.instanceId}`} key={"seeResult"}>
      <a><LocaleMessage id={TABLE_TITLE_ID_PREFIX + "seeResult"}/></a>
    </Link>
  ];

  switch (item.missionInstanceState) {
    case MissionInstanceState.SUBMITTED:
      actions.push(<Divider key={"splitter1"} type={"vertical"}/>);
      actions.push(<a onClick={() => showFinalizeModal(false, item.instanceId)}>
          <LocaleMessage id={TABLE_TITLE_ID_PREFIX + "finalize"}/>
        </a>);
      break;
    case MissionInstanceState.FINALIZED:
      actions.push(<Divider key={"splitter1"} type={"vertical"}/>);
      actions.push(<a key={"seeFinalizeResult"} onClick={() => showFinalizeModal(true, item.instanceId)}><LocaleMessage id={TABLE_TITLE_ID_PREFIX + "finalizeResult"}/></a>);
      break;
  }

  return <span>{actions}</span>;
}

const TABLE_TITLE_ID_PREFIX = ID_PREFIX + "table.";




export class RequesterInstancePanel extends React.Component<Props, State> {

  @Inject requesterService: RequesterService;
  @Inject userStore: UserStore;

  state = {
    loading: false,
    missionId: this.props.missionId || "",
    data: [],
    finalizeModalState: { shown: false, instanceId: "", readonly: true}
  };

  showFinalizeModal = (readonly: boolean, instanceId: string) => {
    this.setState({ finalizeModalState: { shown: true, instanceId,  readonly }});
  };

  onSearch = () => {
    this.fetchInfo();
  };

  async fetchInfo() {
    this.setState({loading: true});
    const result = await this.requesterService.getAllInstancesByMissionId(this.state.missionId, this.userStore.token);
    this.setState({data: result.instances, loading: false});
  }

  onSearchChange = (e) => {
    this.setState({missionId: e.target.value});
  };

  componentDidMount() {
    this.fetchInfo();
  }

  closeFinalizeModal = () => {
    this.setState({ finalizeModalState: {shown: false, instanceId: "", readonly: true}});
  };

  refresh = () => {
    this.fetchInfo();
  };


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
        render: (_, item: Instance) => selectActions(item, this.showFinalizeModal)
      }
    ].map(x => ({...x, key: x.dataIndex, title: <LocaleMessage id={TABLE_TITLE_ID_PREFIX + x.title}/>}));

    return <Container>
      <h1><LocaleMessage id={ID_PREFIX + "title"}/></h1>
      <Localize replacements={placements.search}>
        {props => <Search placeholder={props.placeholder}
                          value={this.state.missionId}
                          onChange={this.onSearchChange}
                          onSearch={this.onSearch}
                          enterButton/>
        }
      </Localize>
      <Table rowKey={"instanceId"} columns={columns}
             dataSource={this.state.data}
             loading={this.state.loading}/>
      <FinalizeModal {...this.state.finalizeModalState}
                     close={this.closeFinalizeModal} refresh={this.refresh}/>

    </Container>
  }
}
