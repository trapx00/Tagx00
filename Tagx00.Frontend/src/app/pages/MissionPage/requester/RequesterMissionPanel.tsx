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
    return res.items.map(x => <RequesterMissionCard mission={x}/>)
  };


  render() {
    return <div>
      <AsyncComponent render={this.renderList}/>
    </div>
  }
}

export class RequesterMissionPanel extends React.Component<Props, {}> {
  render() {
    return <div>
      <h1>
        <span><LocaleMessage id={"missions.requester.mission.title"}/></span>
        <Link to={"/mission/create/image"}>
          <Button style={btnAddMissionStyle} type="primary">
            <LocaleMessage id={"missions.requester.mission.add"}/>
          </Button>
        </Link>
      </h1>
      <RequesterMissionCardList/>
    </div>;
  }
}

