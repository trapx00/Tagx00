import React from 'react';
import { LocaleDate, LocaleMessage, Localize } from "../../../internationalization/components";
import { Input, Table } from 'antd';
import { Instance } from "../../../models/instance/Instance";
import { Inject } from "react.di";
import { RequesterService } from "../../../api/RequesterService";
import { UserStore } from "../../../stores/UserStore";
import { Link } from 'react-router-dom';
import { ColumnProps } from "antd/es/table";
import { InstanceStateIndicator } from "../../../components/Mission/InstanceStateIndicator";
const { Search } = Input;

interface Props {
  missionId?: string;
}

const ID_PREFIX = "missions.requester.instancePanel.";


const placements = {
  search: {
    placeholder: ID_PREFIX + "search.placeholder"
  }
};


interface State {
  loading: boolean;
  missionId: string;
  data: Instance[];
}

const TABLE_TITLE_ID_PREFIX = ID_PREFIX + "table.";

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
    title: "dateRange",
    key: "dateRange",
    children: [
      {
        title: <LocaleMessage id={TABLE_TITLE_ID_PREFIX + "acceptDate"}/>,
        dataIndex: "acceptDate",
        render: (_, item) => <LocaleDate formatId={TABLE_TITLE_ID_PREFIX + "dateFormat"} input={item.acceptDate}/>,
        defaultSortOrder: 'descend' as 'descend',
        sorter: (a, b) => a.acceptDate- b.acceptDate
      },
      {
        title: <LocaleMessage id={TABLE_TITLE_ID_PREFIX + "submitDate"}/>,
        dataIndex: "submitDate",
        render: (_, item) => item.submitDate
          ? <LocaleDate formatId={TABLE_TITLE_ID_PREFIX + "dateFormat"} input={item.submitDate}/>
          : <LocaleMessage id={TABLE_TITLE_ID_PREFIX + "inProgress"} />,
        defaultSortOrder: 'descend' as 'descend',
        sorter: (a, b) => a.submitDate - b.submitDate
      },
    ]
  },
  {
    title: "action",
    render: (_,item: Instance) => {
      return <span>
        <Link to={`/mission/requester/instance/${item.instanceId}`}><a><LocaleMessage id={TABLE_TITLE_ID_PREFIX + "seeResult"}/></a></Link>
      </span>
    }
  }
].map(x => ({...x, key: (x as any).key || x.dataIndex, title: <LocaleMessage id={TABLE_TITLE_ID_PREFIX + x.title}/>}));

export class RequesterInstancePanel extends React.Component<Props, State> {

  @Inject requesterService: RequesterService;
  @Inject userStore: UserStore;

  state = {
    loading: false,
    missionId: this.props.missionId  || "",
    data: []
  };

  onSearch = () => {
    this.fetchInfo();
  };

  async fetchInfo() {
    this.setState({ loading: true});
    const result = await this.requesterService.getAllInstancesByMissionId(this.state.missionId, this.userStore.token);
    this.setState({ data: result.instances, loading: false});
  }

  onSearchChange = (e) => {
    this.setState({ missionId: e.target.value});
  };

  componentDidMount() {
    this.fetchInfo();
  }


  render() {
    return <div>
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
    </div>
  }
}
