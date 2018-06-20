import React, { CSSProperties } from 'react';
import { LocaleMessage } from "../../../internationalization/components";
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { Inject } from "react.di";
import { MissionService } from "../../../api/MissionService";
import { RequesterService } from "../../../api/RequesterService";
import { UserStore } from "../../../stores/UserStore";
import { AsyncComponent } from "../../../router/AsyncComponent";
import { RequesterMissionCard } from "../../../components/Mission/RequesterMissionCard";
import { CardPaneLayout } from "../../../layouts/CardPaneLayout";
import { MissionPublicItem } from "../../../models/mission/MissionPublicItem";
import { DEFAULT_PAGING_INFO, PagingInfo } from "../../../models/PagingInfo";
import { Loading } from "../../../components/Common/Loading";

interface Props {

}

const btnAddMissionStyle: CSSProperties = {
  float: "right"
};

interface State {
  loading: boolean;
  data: MissionPublicItem[];
  paging: PagingInfo;
}

export class RequesterMissionCardList extends React.Component<{},State>{

  @Inject missionService: MissionService;
  @Inject requesterService: RequesterService;
  @Inject userStore: UserStore;

  onPageChange = (page: number, pageSize: number) => {
    this.load(page, pageSize);
  };

  componentDidMount() {
    this.load();
  }

  load(pageNumber =1, pageSize = 2) {
    this.requesterService.getAllMissionsBySelf(this.userStore.user.username, pageNumber, pageSize).then((res) => {
      this.setState({
        loading: false,
        paging: res.pagingInfoVo,
        data: res.items
      })
    });
  }

  state = {
    loading: true,
    data: [],
    paging: DEFAULT_PAGING_INFO
  };

  render() {
    if (this.state.loading){
      return <Loading/>;
    }
    return <CardPaneLayout dataSource={this.state.data}
                          pagination={this.state.paging}
                          loading={this.state.loading}
                          onPageChange={this.onPageChange}
                          renderItem={x => <RequesterMissionCard mission={x}/>}/>
  }
}

export default class RequesterMissionPanel extends React.Component<Props, {}> {
  render() {
    return <div>
      <h1>
        <span><LocaleMessage id={"missions.requester.mission.title"}/></span>
        <Link to={"/mission/requester/create"}>
          <Button style={btnAddMissionStyle} type="primary">
            <LocaleMessage id={"missions.requester.mission.add"}/>
          </Button>
        </Link>
      </h1>
      <RequesterMissionCardList/>
    </div>;
  }
}

