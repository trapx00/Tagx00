import { MissionService } from "../../../../api/MissionService";
import { MissionPublicItem } from "../../../../models/mission/MissionPublicItem";
import { Inject } from "react.di";
import { RequesterService } from "../../../../api/RequesterService";
import React from "react";
import { UserStore } from "../../../../stores/UserStore";
import { DEFAULT_PAGING_INFO, PagingInfo } from "../../../../models/PagingInfo";
import { Loading } from "../../../../components/Common/Loading";
import { CardPaneLayout } from "../../../../layouts/CardPaneLayout";
import { RequesterMissionCard } from "../../../../components/Mission/RequesterMissionCard";
import { MissionState } from "../../../../models/mission/Mission";
import { RouterStore } from "../../../../stores/RouterStore";
import { Filter } from "./Filter";

interface State {
  loading: boolean;
  data: MissionPublicItem[];
  paging: PagingInfo;
}



export class RequesterMissionCardList extends React.Component<{},State>{

  @Inject missionService: MissionService;
  @Inject requesterService: RequesterService;
  @Inject userStore: UserStore;


  @Inject routerStore: RouterStore;

  get query(): MissionState[] {
    const states = this.routerStore.query["state"];

    const array = !states
      ? []
      : typeof states === 'string'
        ? [states]
        : states;
    return array.map(x=>MissionState[x]);
  }

  filter = (states: MissionState[]) => {
    this.routerStore.jumpTo(`/mission/requester?` + states.map(x => "state="+x).join("&"));
  };


  onPageChange = (page: number, pageSize: number) => {
    this.load(page, pageSize);
  };

  componentDidMount() {
    this.load();
  }

  load(pageNumber =1, pageSize = 10) {
    this.requesterService.getAllMissionsBySelf(this.userStore.user.username, this.query, pageNumber, pageSize).then((res) => {
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
    paging: DEFAULT_PAGING_INFO,
  };

  render() {
    if (this.state.loading){
      return <Loading/>;
    }
    return <div>
      <Filter states={this.query} onChange={this.filter}/>
      <CardPaneLayout dataSource={this.state.data}
                      pagination={this.state.paging}
                      loading={this.state.loading}
                      onPageChange={this.onPageChange}
                      renderItem={x => <RequesterMissionCard mission={x}/>}/>
    </div>
  }
}
