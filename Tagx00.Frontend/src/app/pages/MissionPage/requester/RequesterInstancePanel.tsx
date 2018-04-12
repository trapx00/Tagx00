import React from 'react';
import { LocaleDate, LocaleMessage, Localize } from "../../../internationalization/components";
import { Input, Table } from 'antd';
import { Instance } from "../../../models/instance/Instance";
import { Inject } from "react.di";
import { RequesterService } from "../../../api/RequesterService";
import { UserStore } from "../../../stores/UserStore";
import { Link } from 'react-router-dom';
import { ColumnProps } from "antd/es/table";
import { InstanceStateTag } from "../../../components/Mission/InstanceStateTag";
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
    title: TABLE_TITLE_ID_PREFIX + "instanceId",
    dataIndex: "instanceId",
  },
  {
    title: TABLE_TITLE_ID_PREFIX + "missionId",
    dataIndex: "missionId",
  },
  {
    title: TABLE_TITLE_ID_PREFIX + "workerUsername",
    dataIndex: "workerUsername",

  },
  {
    title: TABLE_TITLE_ID_PREFIX + "missionInstanceState",
    dataIndex: "missionInstanceState",
    render: (_, item) => <InstanceStateTag state={item.missionInstanceState}/>
  },

  {
    title: TABLE_TITLE_ID_PREFIX + "acceptDate",
    dataIndex: "acceptDate",
    render: (_, item) => <LocaleDate formatId={TABLE_TITLE_ID_PREFIX + "dateFormat"} input={item.acceptDate}/>
  },
  {
    title: TABLE_TITLE_ID_PREFIX + "submitDate",
    dataIndex: "submitDate",
    render: (_, item) => <LocaleDate formatId={TABLE_TITLE_ID_PREFIX + "dateFormat"} input={item.submitDate}/>
  },
  {
    title: TABLE_TITLE_ID_PREFIX + "action",
    render: (_,item: Instance) => {
      return <span>
        <Link to={`/mission/requester/instance/${item.instanceId}`}><a><LocaleMessage id={TABLE_TITLE_ID_PREFIX + "seeResult"}/></a></Link>
      </span>
    }
  }
].map(x => ({...x, key: x.dataIndex, title: <LocaleMessage id={x.title}/>}));

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
      <Table columns={columns}
             dataSource={this.state.data}
             loading={this.state.loading}/>
    </div>
  }
}
