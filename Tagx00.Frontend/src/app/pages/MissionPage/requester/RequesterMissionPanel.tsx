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

interface Props {

}

const btnAddMissionStyle: CSSProperties = {
  float: "right"
};

export class RequesterMissionCardList extends React.Component<{},{}>{

  @Inject missionService: MissionService;
  @Inject requesterService: RequesterService;
  @Inject userStore: UserStore;


  renderList = async () => {
    const res = await this.requesterService.getAllMissionsBySelf(this.userStore.user.username);
    return <div><CardPaneLayout dataSource={res.items}
                           renderItem={x => <RequesterMissionCard mission={x}/>}/>
    </div>;
  };


  render() {
    return <div>
      <AsyncComponent render={this.renderList}/>
    </div>;
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

